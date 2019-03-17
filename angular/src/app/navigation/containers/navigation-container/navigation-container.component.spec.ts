import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationContainerComponent } from './navigation-container.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { AuthenticationModule } from '../../../authentication/authentication.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppConfig } from '../../../app.config';
import { MockedAppConfig } from '../../../app.config.mock';
import { NavigationElementComponent } from '../../components/navigation-element/navigation-element.component';
import { RouterTestingModule } from '@angular/router/testing';
import { metaReducers, reducers } from '../../../+state/reducer';

describe('NavigationContainerComponent', () => {
  let component: NavigationContainerComponent;
  let fixture: ComponentFixture<NavigationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([]),
        AuthenticationModule,
      ],
      declarations: [
        NavigationElementComponent,
        NavigationComponent,
        NavigationContainerComponent
      ],
      providers: [
        {
          provide: AppConfig,
          useClass: MockedAppConfig
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
