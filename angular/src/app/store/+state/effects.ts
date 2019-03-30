import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  CreateItem,
  CreateItemFailure,
  CreateItemSuccessful,
  DeleteItem,
  DeleteItemFailure,
  DeleteItemSuccessful,
  LoadFromStore,
  LoadFromStoreFailure,
  LoadFromStoreSuccessful,
  LoadStore,
  LoadStoreFailure,
  LoadStoreSuccessful,
  StoreAction,
  StoreActionType,
  UpdateItem,
  UpdateItemFailure,
  UpdateItemSuccessful,
} from './actions';
import { StoreService } from '../services/store.service';
import { MessagingAction, NewMessage } from '../../messaging/+state/actions';
import { newError } from '../../messaging/models/message.interface';

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
      return this.storeService.loadItem(payload.store, payload.id)
        .pipe(
          map((value) => new LoadFromStoreSuccessful({ store: payload.store, id: payload.id, value })),
          catchError(() => of(new LoadFromStoreFailure()))
        );
    })
  );

  @Effect()
  createItem$: Observable<StoreAction> = this.actions$.pipe(
    ofType<CreateItem>(StoreActionType.CreateItem),
    switchMap(({ payload }) => {
      return this.storeService.createItem(payload.store, payload.value)
        .pipe(
          map(() => new CreateItemSuccessful({ store: payload.store })),
          catchError((e) => of(new CreateItemFailure({ errorMessage: e.text })))
        );
    })
  );

  @Effect()
  updateItem: Observable<StoreAction> = this.actions$.pipe(
    ofType<UpdateItem>(StoreActionType.UpdateItem),
    switchMap(({ payload }) => {
      return this.storeService.updateItem(payload.store, payload.id, payload.value)
        .pipe(
          map(() => new UpdateItemSuccessful({ store: payload.store })),
          catchError((e) => of(new UpdateItemFailure({ errorMessage: e.text })))
        );
    })
  );

  @Effect()
  errorMessageForItemCreationFailure$: Observable<MessagingAction> = this.actions$.pipe(
    ofType<CreateItemFailure>(StoreActionType.CreateItemFailure),
    map(({ payload }) => new NewMessage(newError(payload.errorMessage)))
  );

  @Effect()
  delete$: Observable<StoreAction> = this.actions$.pipe(
    ofType<DeleteItem>(StoreActionType.DeleteItem),
    switchMap(({ payload }) => {
      return this.storeService.deleteItem(payload.store, payload.id)
        .pipe(
          map(() => new DeleteItemSuccessful()),
          catchError(() => of(new DeleteItemFailure()))
        );
    })
  );
}
