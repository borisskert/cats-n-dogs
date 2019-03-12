import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../models/user-info.interface';
import { Store } from '@ngrx/store';
import { TryLoadUserInfo, TryLogin } from '../../+state/actions';
import { LoginCredentials } from '../../models/login-credentials.interface';
import { userInfo, isAuthenticated } from '../../+state/selectors';
import { State } from '../../../+state/contract';

@Component({
  selector: 'app-authentication-container',
  templateUrl: './authentication-container.component.html',
  styleUrls: [ './authentication-container.component.scss' ]
})
export class AuthenticationContainerComponent implements OnInit {

  public isAuthenticated$: Observable<boolean>;
  public userInfo$: Observable<UserInfo>;

  constructor(private readonly store: Store<State>) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
    this.userInfo$ = this.store.select(userInfo);

    this.store.dispatch(new TryLoadUserInfo());
  }

  public onLogin(login: LoginCredentials) {
    this.store.dispatch(new TryLogin(login));
  }
}
