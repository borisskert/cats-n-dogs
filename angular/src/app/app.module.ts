import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './+state/effects';
import { metaReducers, reducers } from './+state/reducer';
import { AppConfig } from './app.config';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './authentication/authentication.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ Effects ]),
    AppRoutingModule,
    AuthenticationModule,
  ],
  providers: [
    AppConfig, {
      provide: APP_INITIALIZER,
      useFactory: (config: AppConfig) => () => config.load(),
      deps: [ AppConfig ],
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
