import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AuthenticationContainerComponent } from './containers/authentication-container/authentication-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Effects } from './+state/effects';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([ Effects ]),
  ],
  declarations: [
    LoginComponent,
    UserInfoComponent,
    AuthenticationContainerComponent,
  ],
  exports: [
    AuthenticationContainerComponent,
  ],
})
export class AuthenticationModule {}
