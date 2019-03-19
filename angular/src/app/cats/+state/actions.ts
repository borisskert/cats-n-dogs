import { Action } from '@ngrx/store';
import { Cat } from '../models/cat';
import { Cats } from '../models/cats';

export enum CatActionType {
  LoadCats = '[Cat] Load Cats',
  LoadCatsSuccessful = '[Cat] Load Cats Successful',
  LoadCatsFailure = '[Cat] Load Cats Failure',
  NewCatToCreate = '[Cat] New Cat To Create',
  StoreCreatedCat = '[Cat] Store Created Cat',
  StoreCreatedCatSuccessful = '[Cat] Store Created Cat Successful',
  StoreCreatedCatFailure = '[Cat] Store Created Cat Failure',
  StoreUpdatedCat = '[Cat] Store Updated Cat',
  StoreUpdatedCatSuccessful = '[Cat] Store Updated Cat Successful',
  StoreUpdatedCatFailure = '[Cat] Store Updated Cat Failure',
  SelectCat = '[Cat] Select Cat',
  UnselectCat = '[Cat] Unselect Cat',
  CancelCatCreation = '[Cat] Cancel Cat Creation',
}

export type CatAction =
  | LoadCats
  | LoadCatsSuccessful
  | LoadCatsFailure
  | NewCatToCreate
  | StoreCreatedCat
  | StoreCreatedCatSuccessful
  | StoreCreatedCatFailure
  | StoreUpdatedCat
  | StoreUpdatedCatSuccessful
  | StoreUpdatedCatFailure
  | SelectCat
  | UnselectCat
  | CancelCatCreation
  ;

export class LoadCats implements Action {
  readonly type = CatActionType.LoadCats;
}

export class LoadCatsSuccessful implements Action {
  readonly type = CatActionType.LoadCatsSuccessful;

  constructor(public payload: Cats) {}
}

export class LoadCatsFailure implements Action {
  readonly type = CatActionType.LoadCatsFailure;
}

export class NewCatToCreate implements Action {
  readonly type = CatActionType.NewCatToCreate;

  constructor(public payload: Cat) {}
}

export class StoreCreatedCat implements Action {
  readonly type = CatActionType.StoreCreatedCat;

  constructor(public payload: Cat) {}
}

export class StoreCreatedCatSuccessful implements Action {
  readonly type = CatActionType.StoreCreatedCatSuccessful;
}

export class StoreCreatedCatFailure implements Action {
  readonly type = CatActionType.StoreCreatedCatFailure;

  constructor(public payload: { errorMessage: string }) {}
}

export class StoreUpdatedCat implements Action {
  readonly type = CatActionType.StoreUpdatedCat;

  constructor(public payload: Cat) {}
}

export class StoreUpdatedCatSuccessful implements Action {
  readonly type = CatActionType.StoreUpdatedCatSuccessful;
}

export class StoreUpdatedCatFailure implements Action {
  readonly type = CatActionType.StoreUpdatedCatFailure;
}

export class SelectCat implements Action {
  readonly type = CatActionType.SelectCat;

  constructor(public payload: string) {}
}

export class UnselectCat implements Action {
  readonly type = CatActionType.UnselectCat;
}

export class CancelCatCreation implements Action {
  readonly type = CatActionType.CancelCatCreation;
}
