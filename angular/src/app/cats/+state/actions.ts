import { Action } from '@ngrx/store';
import { Cat } from '../models/cat';

export enum CatActionType {
  LoadCats = '[Cat] Load Cats',
  LoadCatsSuccessful = '[Cat] Load Cats Successful',
  LoadCatsFailure = '[Cat] Load Cats Failure',
  CreateCat = '[Cat] Create Cat',
  SaveCat = '[Cat] Save Cat',
  SaveCatSuccessful = '[Cat] Save Cat Successful',
  SaveCatFailure = '[Cat] Save Cat Failure',
  SelectCat = '[Cat] Select Cat',
}

export type CatAction =
  | LoadCats
  | LoadCatsSuccessful
  | LoadCatsFailure
  | CreateCat
  | SaveCat
  | SaveCatSuccessful
  | SaveCatFailure
  | SelectCat
  ;

export class LoadCats implements Action {
  readonly type = CatActionType.LoadCats;
}

export class LoadCatsSuccessful implements Action {
  readonly type = CatActionType.LoadCatsSuccessful;
  constructor(public payload: Cat[]) {}
}

export class LoadCatsFailure implements Action {
  readonly type = CatActionType.LoadCatsFailure;
}

export class CreateCat implements Action {
  readonly type = CatActionType.CreateCat;
  constructor(public payload: Cat) {}
}

export class SaveCat implements Action {
  readonly type = CatActionType.SaveCat;
  constructor(public payload: Cat) {}
}

export class SaveCatSuccessful implements Action {
  readonly type = CatActionType.SaveCatSuccessful;
}

export class SaveCatFailure implements Action {
  readonly type = CatActionType.SaveCatFailure;
}

export class SelectCat implements Action {
  readonly type = CatActionType.SelectCat;
  constructor(public payload: string) {}
}
