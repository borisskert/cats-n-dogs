import { Action } from '@ngrx/store';
import { Cat } from '../models/cat';

export enum CatActionType {
  NewCatToCreate = '[Cat] New Cat To Create',
  CreateCatSuccessful = '[Cat] Create Cat Successful',
  UpdatedCatSuccessful = '[Cat] Store Updated Cat Successful',
  SelectCat = '[Cat] Select Cat',
  UnselectCat = '[Cat] Unselect Cat',
  CancelCatCreation = '[Cat] Cancel Cat Creation',
}

export type CatAction =
  | NewCatToCreate
  | CreateCatSuccessful
  | UpdatedCatSuccessful
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

export class UpdatedCatSuccessful implements Action {
  readonly type = CatActionType.UpdatedCatSuccessful;
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
