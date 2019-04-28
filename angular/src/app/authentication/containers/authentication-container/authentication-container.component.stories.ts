import { moduleMetadata, storiesOf } from '@storybook/angular';
import { Component } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { State } from '../../../+state/contract';
import { GotUserInfo, LogoutSuccessful, UserInfoLoadFailure, UserInfoLoadSuccessful } from '../../+state/actions';
import { metaReducers, reducers } from '../../../+state/reducer';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from '../../../+state/effects';
import { AuthenticationContainerComponent } from './authentication-container.component';
import { UserInfoComponent } from '../../components/user-info/user-info.component';
import { LoginComponent } from '../../components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-storybook-authentication-container',
  template: `
    <div>
      <button (click)="gotUserInfo()">simulate app start with expired login</button>
      <button (click)="userInfoLoadSuccessful()">simulate login</button>
      <button (click)="expiry()">simulate expiry</button>
      <button (click)="logout()">simulate logout</button>
    </div>
    <app-authentication-container></app-authentication-container>
  `,
})
class AuthenticationContainerStorybookComponent {
  private readonly userInfo = {
    subject: 'subject',
    name: 'name',
    username: 'username',
    givenName: 'given name',
    familyName: 'family name',
    email: 'email@email.com',
    roles: [ 'role 1', 'role 2' ]
  };

  constructor(private readonly store: Store<State>) {
    this.store = store;
  }

  userInfoLoadSuccessful() {
    this.store.dispatch(new UserInfoLoadSuccessful({ userInfo: this.userInfo }));
  }

  gotUserInfo() {
    this.store.dispatch(new GotUserInfo({ userInfo: this.userInfo }));
  }

  expiry() {
    this.store.dispatch(new UserInfoLoadFailure());
  }

  logout() {
    this.store.dispatch(new LogoutSuccessful());
  }
}


storiesOf('Authentication', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([ Effects ]),
        ReactiveFormsModule,
      ],
      declarations: [
        AuthenticationContainerComponent,
        UserInfoComponent,
        LoginComponent,
      ],
    })
  )

  .add('AuthenticationContainerComponent', () => ({
      component: AuthenticationContainerStorybookComponent,
      props: {},
    })
  );
