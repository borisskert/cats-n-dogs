import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  AuthenticationActions,
  AuthenticationActionTypes,
  LoginFailure,
  LoginSuccessful, LogoutFailure, LogoutSuccessful,
  TryLogin, TryLogout,
  UserInfoLoadFailure,
  UserInfoLoadSuccessful
} from './actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { MessagingAction, NewMessage } from '../../messaging/+state/actions';
import * as cuid from 'cuid';
import { InitNavigation, NavigationAction, SelectNavigationElement } from '../../navigation/+state/actions';
import { NavigationService } from '../../navigation/services/navigation.service';
import { newWarning } from '../../messaging/models/message.interface';

@Injectable()
export class Effects {

  constructor(
    private readonly actions$: Actions,
    private readonly loginService: LoginService,
    private readonly userService: UserService,
    private readonly navigationService: NavigationService,
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
  tryToLogout$: Observable<AuthenticationActions> = this.actions$.pipe(
    ofType<TryLogout>(AuthenticationActionTypes.TryLogout),
    switchMap(() => {
      return this.loginService.tryLogout()
        .pipe(
          map(() => new LogoutSuccessful()),
          catchError(() => of(new LogoutFailure()))
        );
    })
  );

  @Effect()
  showLoginFailureMessage$: Observable<MessagingAction> = this.actions$.pipe(
    ofType<LoginFailure>(AuthenticationActionTypes.LoginFailure),
    map(() => {
      return new NewMessage(newWarning('Login failed'));
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

  @Effect()
  setupNavigation$: Observable<NavigationAction> = this.actions$.pipe(
    ofType<UserInfoLoadSuccessful>(AuthenticationActionTypes.UserInfoLoadSuccessful),
    map(({ payload }) => {
      let navigationElements = this.navigationService.navigationFor(payload.roles);
      return new InitNavigation({ elements: navigationElements });
    })
  );

  @Effect()
  navigateToHome$: Observable<NavigationAction> = this.actions$.pipe(
    ofType<LogoutSuccessful>(AuthenticationActionTypes.LogoutSuccessful),
    switchMap(() => [
      new SelectNavigationElement({selected: 'HOME'}),
      new InitNavigation({elements: []}),
    ])
  )
}
