import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './authentication/authentication.module';
import { MessagingModule } from './messaging/messaging.module';
import { UsersComponent } from './components/users/users.component';
import { CatsComponent } from './components/cats/cats.component';
import { NavigationModule } from './navigation/navigation.module';
import { HomeComponent } from './components/home/home.component';
import { DogsComponent } from './components/dogs/dogs.component';
import { CatsModule } from './cats/cats.module';
import { AppStateModule } from './app-state.module';
import { StateModule } from './version/state.module';
import { StoreModule } from './store/store.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CatsComponent,
    HomeComponent,
    DogsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppStateModule,
    AppRoutingModule,
    NavigationModule,
    AuthenticationModule,
    MessagingModule,
    CatsModule,
    StateModule,
    StoreModule,
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
