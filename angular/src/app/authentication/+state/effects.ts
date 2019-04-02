import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  AuthenticationActions,
  AuthenticationActionTypes, GotUserInfo,
  LoginFailure,
  LoginSuccessful,
  LogoutFailure,
  LogoutSuccessful,
  TryLogin,
  TryLogout,
  UserInfoLoadFailure,
  UserInfoLoadSuccessful
} from './actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { MessagingAction, NewMessage } from '../../messaging/+state/actions';
import { InitNavigation, NavigationAction, SelectNavigationElement } from '../../navigation/+state/actions';
import { NavigationService } from '../../navigation/services/navigation.service';
import { newWarning } from '../../messaging/models/message.interface';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserInfo } from '../models/user-info.interface';

@Injectable()
export class Effects {

  constructor(
    private readonly actions$: Actions,
    private readonly localStorage: LocalStorageService,
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
    ofType(AuthenticationActionTypes.GetUserInfo),
    map(() => {
      const userInfo = this.userService.readUser();
      return new GotUserInfo({ userInfo });
    })
  );

  @Effect()
  loadUserProperties$: Observable<AuthenticationActions> = this.actions$.pipe(
    ofType(AuthenticationActionTypes.LoginSuccessful, AuthenticationActionTypes.TryLoadUserInfo, AuthenticationActionTypes.GotUserInfo),
    switchMap(() => {
      return this.userService.loadUser()
        .pipe(
          map(userInfo => new UserInfoLoadSuccessful({ userInfo })),
          catchError(() => of(new UserInfoLoadFailure()))
        );
    })
  );

  @Effect({ dispatch: false })
  storeUserProperties$ = this.actions$.pipe(
    ofType<UserInfoLoadSuccessful>(AuthenticationActionTypes.UserInfoLoadSuccessful),
    tap(({ payload }) => {
      this.userService.storeUser(payload.userInfo);
    })
  );

  @Effect()
  setupNavigation$: Observable<NavigationAction> = this.actions$.pipe(
    ofType<UserInfoLoadSuccessful>(AuthenticationActionTypes.UserInfoLoadSuccessful),
    map(({ payload }) => {
      const navigationElements = this.navigationService.navigationFor(payload.userInfo.roles);
      return new InitNavigation({ elements: navigationElements });
    })
  );

  @Effect()
  navigateToHome$: Observable<NavigationAction> = this.actions$.pipe(
    ofType<LogoutSuccessful>(AuthenticationActionTypes.LogoutSuccessful),
    switchMap(() => [
      new SelectNavigationElement({ selected: 'HOME' }),
      new InitNavigation({ elements: [] }),
    ])
  );
}
