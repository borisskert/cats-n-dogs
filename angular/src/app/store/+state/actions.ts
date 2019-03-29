import { Action } from '@ngrx/store';

export enum StoreActionType {
  LoadStore = '[Store] Load Store',
  LoadStoreSuccessful = '[Store] Load Store Successful',
  LoadStoreFailure = '[Store] Load Store Failure',
  LoadFromStore = '[Store] Load From Store',
  LoadFromStoreSuccessful = '[Store] Load From Store Successful',
  LoadFromStoreFailure = '[Store] Load From Store Failure',
  DeleteFromStore = '[Store] Delete From Store',
}

export type StoreAction =
  | LoadStore
  | LoadStoreSuccessful
  | LoadStoreFailure
  | LoadFromStore
  | LoadFromStoreSuccessful
  | LoadFromStoreFailure
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

export class DeleteFromStore implements Action {
  readonly type = StoreActionType.DeleteFromStore;

  constructor(public payload: { store: string, id: string }) {}
}
