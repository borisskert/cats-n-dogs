import { Action } from '@ngrx/store';

export enum StoreActionType {
  SynchronizeStores = '[Store] Synchronize Stores',
  ReadStores = '[Store] Read Stores',
  ReadStore = '[Store] Read Store',
  ReadStoreSuccessful = '[Store] Read Store Successful',
  ReadStoreFailure = '[Store] Read Store Failure',
  LoadStore = '[Store] Load Store',
  LoadStoreSuccessful = '[Store] Load Store Successful',
  LoadStoreFailure = '[Store] Load Store Failure',
  LoadFromStore = '[Store] Load From Store',
  LoadFromStoreSuccessful = '[Store] Load From Store Successful',
  LoadFromStoreFailure = '[Store] Load From Store Failure',
  CreateItem = '[Store] Create Item',
  CreateItemSuccessful = '[Store] Create Item Successful',
  CreateItemFailure = '[Store] Create Item Failure',
  UpdateItem = '[Store] Update Item',
  UpdateItemSuccessful = '[Store] Update Item Successful',
  UpdateItemFailure = '[Store] Update Item Failure',
  DeleteItem = '[Store] Delete Item',
  DeleteItemSuccessful = '[Store] Delete Item Successful',
  DeleteItemFailure = '[Store] Delete Item Failure',
  DeleteFromStore = '[Store] Delete From Store',
}

export type StoreAction =
  | SynchronizeStores
  | ReadStores
  | ReadStore
  | ReadStoreSuccessful
  | ReadStoreFailure
  | LoadStore
  | LoadStoreSuccessful
  | LoadStoreFailure
  | LoadFromStore
  | LoadFromStoreSuccessful
  | LoadFromStoreFailure
  | CreateItem
  | CreateItemSuccessful
  | CreateItemFailure
  | UpdateItem
  | UpdateItemSuccessful
  | UpdateItemFailure
  | DeleteItem
  | DeleteItemSuccessful
  | DeleteItemFailure
  | DeleteFromStore
  ;

export class SynchronizeStores implements Action {
  readonly type = StoreActionType.SynchronizeStores;
}

export class ReadStores implements Action {
  readonly type = StoreActionType.ReadStores;
}

export class ReadStore implements Action {
  readonly type = StoreActionType.ReadStore;

  constructor(public payload: { store: string }) {}
}

export class ReadStoreSuccessful implements Action {
  readonly type = StoreActionType.ReadStoreSuccessful;

  constructor(public payload: { store: string, value: any }) {}
}

export class ReadStoreFailure implements Action {
  readonly type = StoreActionType.ReadStoreFailure;
}

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

  constructor(public payload: { store: string, id: string, versionId: string }) {}
}

export class LoadFromStoreSuccessful implements Action {
  readonly type = StoreActionType.LoadFromStoreSuccessful;

  constructor(public payload: { store: string, id: string, value: any }) {}
}

export class LoadFromStoreFailure implements Action {
  readonly type = StoreActionType.LoadFromStoreFailure;
}

export class CreateItem implements Action {
  readonly type = StoreActionType.CreateItem;

  constructor(public payload: { store: string, value: any }) {}
}

export class CreateItemSuccessful implements Action {
  readonly type = StoreActionType.CreateItemSuccessful;

  constructor(public payload: { store: string }) {}
}

export class CreateItemFailure implements Action {
  readonly type = StoreActionType.CreateItemFailure;

  constructor(public payload: { errorMessage: string }) {}
}

export class UpdateItem implements Action {
  readonly type = StoreActionType.UpdateItem;

  constructor(public payload: { store: string, id: string, value: any }) {}
}

export class UpdateItemSuccessful implements Action {
  readonly type = StoreActionType.UpdateItemSuccessful;

  constructor(public payload: { store: string }) {}
}

export class UpdateItemFailure implements Action {
  readonly type = StoreActionType.UpdateItemFailure;

  constructor(public payload: { errorMessage: string }) {}
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

  constructor(public payload: { store: string, id: string, versionId: string }) {}
}
