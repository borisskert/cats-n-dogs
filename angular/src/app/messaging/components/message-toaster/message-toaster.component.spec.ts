import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageToasterComponent } from './message-toaster.component';
import { MessageComponent } from '../message/message.component';

describe('MessageToasterComponent', () => {
  let component: MessageToasterComponent;
  let fixture: ComponentFixture<MessageToasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MessageComponent,
        MessageToasterComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
