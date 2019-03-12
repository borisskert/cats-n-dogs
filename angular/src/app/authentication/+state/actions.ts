import { Action } from '@ngrx/store';
import { UserInfo } from '../models/user-info.interface';
import { LoginCredentials } from '../models/login-credentials.interface';

export enum AuthenticationActionTypes {
  TryLogin = '[Authentication] Try Login',
  LoginSuccessful = '[Authentication] Login Sucessful',
  LoginFailure = '[Authentication] Login Failure',
  TryLoadUserInfo = '[Authentication] Try Load User Info',
  UserInfoLoadSuccessful = '[Authentication] User Info Load Sucessful',
  UserInfoLoadFailure = '[Authentication] User Info Load Failure',
}

export type AuthenticationActions =
  | TryLogin
  | LoginSuccessful
  | LoginFailure
  | TryLoadUserInfo
  | UserInfoLoadSuccessful
  | UserInfoLoadFailure
  ;


export class TryLogin implements Action {
  readonly type = AuthenticationActionTypes.TryLogin;

  constructor(public payload: LoginCredentials) {}
}

export class LoginSuccessful implements Action {
  readonly type = AuthenticationActionTypes.LoginSuccessful;
}

export class LoginFailure implements Action {
  readonly type = AuthenticationActionTypes.LoginFailure;
}

export class TryLoadUserInfo implements Action {
  readonly type = AuthenticationActionTypes.TryLoadUserInfo;
}

export class UserInfoLoadSuccessful implements Action {
  readonly type = AuthenticationActionTypes.UserInfoLoadSuccessful;

  constructor(public payload: UserInfo) {}
}

export class UserInfoLoadFailure implements Action {
  readonly type = AuthenticationActionTypes.UserInfoLoadFailure;
}
