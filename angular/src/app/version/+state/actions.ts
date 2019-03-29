import { Action } from '@ngrx/store';
import { StateVersion } from '../models/state';

export enum AppActionType {
  LoadLatestStateVersion = '[App] Load Latest State Version',
  LoadLatestStateVersionSuccessful = '[App] Load Latest State Version Successful',
  LoadLatestStateVersionFailure = '[App] Load Latest State Version Failure',
  LoadStatesSuccessful = '[App] Load States Successful',
  LoadStatesFailure = '[App] Load States Failure',
}

export type AppAction =
  | LoadLatestStateVersion
  | LoadLatestStateVersionSuccessful
  | LoadLatestStateVersionFailure
  | LoadStatesSuccessful
  | LoadStatesFailure
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
