import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { pipe } from 'rxjs';
import { delay, filter, flatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { AutoDismissMessages, CloseMessage, DismissMessages, MessagingActionTypes } from './actions';
import { Store } from '@ngrx/store';
import { State } from '../../+state/contract';
import { getAutoDismiss, getMessageIds } from './selectors';

@Injectable()
export class Effects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<State>,
  ) {}

  @Effect()
  autoDismissMessages$ = this.actions$.pipe(
    ofType<AutoDismissMessages>(MessagingActionTypes.AutoDismissMessages),
    pipe(
      withLatestFrom(this.store.select(getMessageIds), (_, ids) => (ids)),
      delay(5000),
      mergeMap((ids) => {
        if (ids.length > 0) {
          return [
            new DismissMessages(ids),
            new AutoDismissMessages(),
          ];
        } else {
          return [ new AutoDismissMessages() ];
        }
      })
    )
  );

  @Effect()
  dismissMessages$ = this.actions$.pipe(
    ofType<DismissMessages>(MessagingActionTypes.DismissMessages),
    pipe(
      withLatestFrom(this.store.select(getAutoDismiss), ({ payload }, autoDismiss) => ({ payload, autoDismiss })),
      filter(({ payload, autoDismiss }) => autoDismiss),
      map(({ payload, autoDismiss }) => payload),
      flatMap(ids => ids),
      map((id) => new CloseMessage(id))
    )
  );
}
