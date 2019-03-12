import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationContainerComponent } from './authentication-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserInfoComponent } from '../../components/user-info/user-info.component';
import { LoginComponent } from '../../components/login/login.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../../+state/reducer';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from '../../../+state/effects';

describe('AuthenticationContainerComponent', () => {
  let component: AuthenticationContainerComponent;
  let fixture: ComponentFixture<AuthenticationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([ Effects ]),
      ],
      declarations: [
        UserInfoComponent,
        LoginComponent,
        AuthenticationContainerComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
