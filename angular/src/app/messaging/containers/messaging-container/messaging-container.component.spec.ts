import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingContainerComponent } from './messaging-container.component';
import { MessageToasterComponent } from '../../components/message-toaster/message-toaster.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../../+state/reducer';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from '../../../+state/effects';

describe('MessagingContainerComponent', () => {
  let component: MessagingContainerComponent;
  let fixture: ComponentFixture<MessagingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([ Effects ]),
      ],
      declarations: [
        MessagingContainerComponent,
        MessageToasterComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
