import { Action } from '@ngrx/store';
import { StateVersion } from '../../models/state';

export enum AppActionType {
  LoadLatestStateVersion = '[App] Load Latest State Version',
  LoadLatestStateVersionSuccessful = '[App] Load Latest State Version Successful',
  LoadLatestStateVersionFailure = '[App] Load Latest State Version Failure',
  LoadStatesSuccessful = '[App] Load States Successful',
  LoadStatesFailure = '[App] Load States Failure',
  LoadFromStore = '[App] Load From Store',
  DeletedFromStore = '[App] Deleted From Store',
}

export type AppAction =
  | LoadLatestStateVersion
  | LoadLatestStateVersionSuccessful
  | LoadLatestStateVersionFailure
  | LoadStatesSuccessful
  | LoadStatesFailure
  | DeletedFromStore
  ;

export class LoadLatestStateVersion implements Action {
  readonly type = AppActionType.LoadLatestStateVersion;
}

export class LoadLatestStateVersionSuccessful implements Action {
  readonly type = AppActionType.LoadLatestStateVersionSuccessful;
  constructor(public payload: string) {}
}

export class LoadLatestStateVersionFailure implements Action {
  readonly type = AppActionType.LoadLatestStateVersionFailure;
}

export class LoadStatesSuccessful implements Action {
  readonly type = AppActionType.LoadStatesSuccessful;
  constructor(public payload: StateVersion[]) {}
}

export class LoadStatesFailure implements Action {
  readonly type = AppActionType.LoadStatesFailure;
}

export class LoadFromStore implements Action {
  readonly type = AppActionType.LoadFromStore;
  constructor(public payload: {store: string, id: string}) {}
}

export class DeletedFromStore implements Action {
  readonly type = AppActionType.DeletedFromStore;
  constructor(public payload: {store: string, id: string}) {}
}
