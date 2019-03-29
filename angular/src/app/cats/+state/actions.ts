import { Action } from '@ngrx/store';
import { Cat } from '../models/cat';

export enum CatActionType {
  NewCatToCreate = '[Cat] New Cat To Create',
  CreateCatSuccessful = '[Cat] Create Cat Successful',
  StoreUpdatedCat = '[Cat] Store Updated Cat',
  StoreUpdatedCatSuccessful = '[Cat] Store Updated Cat Successful',
  StoreUpdatedCatFailure = '[Cat] Store Updated Cat Failure',
  SelectCat = '[Cat] Select Cat',
  UnselectCat = '[Cat] Unselect Cat',
  CancelCatCreation = '[Cat] Cancel Cat Creation',
}

export type CatAction =
  | NewCatToCreate
  | CreateCatSuccessful
  | StoreUpdatedCat
  | StoreUpdatedCatSuccessful
  | StoreUpdatedCatFailure
  | SelectCat
  | UnselectCat
  | CancelCatCreation
  ;

export class NewCatToCreate implements Action {
  readonly type = CatActionType.NewCatToCreate;

  constructor(public payload: Cat) {}
}

export class CreateCatSuccessful implements Action {
  readonly type = CatActionType.CreateCatSuccessful;
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
