import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './+state/reducer';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './+state/effects';
import { AppConfig } from './app.config';
import { MockedAppConfig } from './app.config.mock';
import { MessagingModule } from './messaging/messaging.module';
import { NavigationModule } from './navigation/navigation.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([ Effects ]),
        NavigationModule,
        AuthenticationModule,
        MessagingModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AppConfig,
          useClass: MockedAppConfig
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
