import { Action } from '@ngrx/store';

export enum StoreActionType {
  LoadStore = '[Store] Load Store',
  LoadStoreSuccessful = '[Store] Load Store Successful',
  LoadStoreFailure = '[Store] Load Store Failure',
  LoadFromStore = '[Store] Load From Store',
  LoadFromStoreSuccessful = '[Store] Load From Store Successful',
  LoadFromStoreFailure = '[Store] Load From Store Failure',
  DeleteItem = '[Store] Delete Item',
  DeleteItemSuccessful = '[Store] Delete Item Successful',
  DeleteItemFailure = '[Store] Delete Item Failure',
  DeleteFromStore = '[Store] Delete From Store',
}

export type StoreAction =
  | LoadStore
  | LoadStoreSuccessful
  | LoadStoreFailure
  | LoadFromStore
  | LoadFromStoreSuccessful
  | LoadFromStoreFailure
  | DeleteItem
  | DeleteItemSuccessful
  | DeleteItemFailure
  | DeleteFromStore
  ;

export class LoadStore implements Action {
  readonly type = StoreActionType.LoadStore;

  constructor(public payload: { store: string }) {}
}

export class LoadStoreSuccessful implements Action {
  readonly type = StoreActionType.LoadStoreSuccessful;

  constructor(public payload: { store: string, value: any }) {}
}

export class LoadStoreFailure implements Action {
  readonly type = StoreActionType.LoadStoreFailure;
}

export class LoadFromStore implements Action {
  readonly type = StoreActionType.LoadFromStore;

  constructor(public payload: { store: string, id: string }) {}
}

export class LoadFromStoreSuccessful implements Action {
  readonly type = StoreActionType.LoadFromStoreSuccessful;

  constructor(public payload: { store: string, id: string, value: any }) {}
}

export class LoadFromStoreFailure implements Action {
  readonly type = StoreActionType.LoadFromStoreFailure;
}

export class DeleteItem implements Action {
  readonly type = StoreActionType.DeleteItem;

  constructor(public payload: { store: string, id: string }) {}
}

export class DeleteItemSuccessful implements Action {
  readonly type = StoreActionType.DeleteItemSuccessful;
}

export class DeleteItemFailure implements Action {
  readonly type = StoreActionType.DeleteItemFailure;
}

export class DeleteFromStore implements Action {
  readonly type = StoreActionType.DeleteFromStore;

  constructor(public payload: { store: string, id: string }) {}
}
