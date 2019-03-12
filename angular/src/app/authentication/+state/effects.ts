import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  AuthenticationActions,
  AuthenticationActionTypes,
  LoginFailure,
  LoginSuccessful,
  TryLogin,
  UserInfoLoadFailure,
  UserInfoLoadSuccessful
} from './actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Injectable()
export class Effects {

  constructor(
    private readonly actions$: Actions,
    private readonly loginService: LoginService,
    private readonly userService: UserService,
  ) {}

  @Effect()
  tryToLogin$: Observable<AuthenticationActions> = this.actions$.pipe(
    ofType<TryLogin>(AuthenticationActionTypes.TryLogin),
    switchMap(({ payload }) => {
      return this.loginService.tryLogin(payload)
        .pipe(
          map(() => new LoginSuccessful()),
          catchError(() => of(new LoginFailure()))
        );
    })
  );

  @Effect()
  readUserProperties$: Observable<AuthenticationActions> = this.actions$.pipe(
    ofType(AuthenticationActionTypes.LoginSuccessful, AuthenticationActionTypes.TryLoadUserInfo),
    switchMap(() => {
      return this.userService.getUser()
        .pipe(
          map(userInfo => new UserInfoLoadSuccessful(userInfo)),
          catchError(() => of(new UserInfoLoadFailure()))
        );
    })
  );
}
