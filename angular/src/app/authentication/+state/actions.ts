import { Action } from '@ngrx/store';
import { UserInfo } from '../models/user-info.interface';
import { LoginCredentials } from '../models/login-credentials.interface';

export enum AuthenticationActionTypes {
  TryLogin = '[Authentication] Try Login',
  LoginSuccessful = '[Authentication] Login Sucessful',
  LoginFailure = '[Authentication] Login Failure',
  TryLogout = '[Authentication] Try Logout',
  LogoutSuccessful = '[Authentication] Logout Sucessful',
  LogoutFailure = '[Authentication] Logout Failure',
  GetUserInfo = '[Authentication] Get User Info',
  GotUserInfo = '[Authentication] Got User Info',
  TryLoadUserInfo = '[Authentication] Try Load User Info',
  UserInfoLoadSuccessful = '[Authentication] User Info Load Sucessful',
  UserInfoLoadFailure = '[Authentication] User Info Load Failure',
}

export type AuthenticationActions =
  | TryLogin
  | LoginSuccessful
  | LoginFailure
  | TryLogout
  | LogoutSuccessful
  | LogoutFailure
  | GetUserInfo
  | GotUserInfo
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

export class TryLogout implements Action {
  readonly type = AuthenticationActionTypes.TryLogout;
}

export class LogoutSuccessful implements Action {
  readonly type = AuthenticationActionTypes.LogoutSuccessful;
}

export class LogoutFailure implements Action {
  readonly type = AuthenticationActionTypes.LogoutFailure;
}

export class GetUserInfo implements Action {
  readonly type = AuthenticationActionTypes.GetUserInfo;
}

export class GotUserInfo implements Action {
  readonly type = AuthenticationActionTypes.GotUserInfo;

  constructor(public payload: { userInfo: UserInfo }) {}
}

export class TryLoadUserInfo implements Action {
  readonly type = AuthenticationActionTypes.TryLoadUserInfo;
}

export class UserInfoLoadSuccessful implements Action {
  readonly type = AuthenticationActionTypes.UserInfoLoadSuccessful;

  constructor(public payload: { userInfo: UserInfo }) {}
}

export class UserInfoLoadFailure implements Action {
  readonly type = AuthenticationActionTypes.UserInfoLoadFailure;
}
