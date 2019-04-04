import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { StateService } from '../services/state.service';
import { Action, Store } from '@ngrx/store';
import {
  AppAction,
  AppActionType,
  LoadLatestStateVersionFailure,
  LoadLatestStateVersionSuccessful,
  LoadStatesFailure,
  LoadStatesSuccessful, ReadCurrentStateVersion, ReadCurrentStateVersionSuccessful
} from './actions';
import { State } from '../../+state/contract';
import { getLatestVersion, getCurrentVersion } from './selectors';
import { flatMap, groupBy } from '../../common/array-utils';
import { StateVersion } from '../models/state';
import { compareAsc } from 'date-fns';
import { DeleteFromStore, LoadFromStore, StoreActionType } from '../../store/+state/actions';


@Injectable()
export class Effects {
  constructor(
    private readonly actions$: Actions,
    private readonly stateService: StateService,
    private readonly store: Store<State>,
  ) {}

  @Effect()
  readCurrentStateVersion$ = this.actions$.pipe(
    ofType<ReadCurrentStateVersion>(AppActionType.ReadCurrentStateVersion),
    map(() => {
      const currentVersion = this.stateService.getCurrentVersion();
      return new ReadCurrentStateVersionSuccessful({ currentVersion });
    })
  );

  @Effect()
  loadLatestStateVersion$: Observable<AppAction> = this.actions$.pipe(
    ofType(
      AppActionType.LoadLatestStateVersion,
      StoreActionType.CreateItemSuccessful,
      StoreActionType.UpdateItemSuccessful,
      StoreActionType.DeleteItemSuccessful,
    ),
    switchMap(() => {
      return this.stateService.getLatestVersion()
        .pipe(
          map((version) => new LoadLatestStateVersionSuccessful(version)),
          catchError(() => of(new LoadLatestStateVersionFailure()))
        );
    })
  );

  @Effect()
  loadState$: Observable<AppAction> = this.actions$.pipe(
    ofType<LoadLatestStateVersionSuccessful>(AppActionType.LoadLatestStateVersionSuccessful),
    withLatestFrom(this.store.select(getCurrentVersion), (action, version) => ({ latest: action.payload, current: version })),
    switchMap(({ latest, current }) => {
      if (current) {
        return this.stateService.loadStateBetween(current, latest)
          .pipe(
            map((states) => new LoadStatesSuccessful(states)),
            catchError(() => of(new LoadStatesFailure()))
          );
      } else {
        return this.stateService.loadStateTo(latest)
          .pipe(
            map((states) => new LoadStatesSuccessful(states)),
            catchError(() => of(new LoadStatesFailure()))
          );
      }
    })
  );

  @Effect()
  updateState$ = this.actions$.pipe(
    ofType<LoadStatesSuccessful>(AppActionType.LoadStatesSuccessful),
    switchMap(({ payload }) => {
      const groupedByStore = groupBy<StateVersion>(payload, 'action.store');
      return flatMap(
        Object.keys(groupedByStore)
          .map(store => groupedByStore[store])
          .map(group => groupBy(group, 'action.id')),
        mapToActions
      );
    })
  );
}

function mapToActions(groupedById): Action[] {
  return flatMap(
    Object.keys(groupedById).map(id => groupedById[id]),
    group => groupToAction(group)
  );
}

function groupToAction(groupById: StateVersion[]): Action[] {
  return groupById
    .sort((a, b) => compareAsc(a.timestamp, b.timestamp))
    .reduce((_, stateVersion) => {
      if (stateVersion.action.type === 'DELETE') {
        return [ new DeleteFromStore({ store: stateVersion.action.store, id: stateVersion.action.id, versionId: stateVersion.id }) ];
      } else {
        return [ new LoadFromStore({ store: stateVersion.action.store, id: stateVersion.action.id, versionId: stateVersion.id }) ];
      }
    }, []);
}
