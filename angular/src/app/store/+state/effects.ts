import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  LoadFromStore,
  LoadFromStoreFailure,
  LoadFromStoreSuccessful, LoadStore, LoadStoreFailure, LoadStoreSuccessful,
  StoreAction,
  StoreActionType,
} from './actions';
import { StoreService } from '../services/store.service';

@Injectable()
export class Effects {

  constructor(
    private readonly actions$: Actions,
    private readonly storeService: StoreService,
  ) {}

  @Effect()
  loadStore$: Observable<StoreAction> = this.actions$.pipe(
    ofType<LoadStore>(StoreActionType.LoadStore),
    switchMap(({ payload }) => {
      return this.storeService.loadStore(payload.store)
        .pipe(
          map((value) => new LoadStoreSuccessful({ store: payload.store, value })),
          catchError(() => of(new LoadStoreFailure()))
        );
    })
  );

  @Effect()
  loadFromStore$: Observable<StoreAction> = this.actions$.pipe(
    ofType<LoadFromStore>(StoreActionType.LoadFromStore),
    switchMap(({ payload }) => {
      return this.storeService.loadFromStore(payload.store, payload.id)
        .pipe(
          map((value) => new LoadFromStoreSuccessful({ store: payload.store, id: payload.id, value })),
          catchError(() => of(new LoadFromStoreFailure()))
        );
    })
  );
}
