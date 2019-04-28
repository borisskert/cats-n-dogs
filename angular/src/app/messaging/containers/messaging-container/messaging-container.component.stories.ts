import { moduleMetadata, storiesOf } from '@storybook/angular';

import { array, date, object, select, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { MessagingContainerComponent } from './messaging-container.component';
import { MessageComponent } from '../../components/message/message.component';
import { MessageToasterComponent } from '../../components/message-toaster/message-toaster.component';
import { Store, StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../../+state/reducer';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from '../../../+state/effects';
import { Component } from '@angular/core';
import { State } from '../../../+state/contract';
import { NewMessage } from '../../+state/actions';
import { newError, newInfo, newWarning } from '../../models/message.interface';

@Component({
  selector: 'app-storybook-messaging-container',
  template: `
    <div>
      <button (click)="newInfo()">new info message</button>
      <button (click)="newWarning()">new warning message</button>
      <button (click)="newError()">new error message</button>
    </div>
    <app-messaging-container></app-messaging-container>
  `,
})
class MessagingContainerStorybookComponent {
  constructor(private readonly store: Store<State>) {
    this.store = store;
  }

  newInfo() {
    this.store.dispatch(new NewMessage(newInfo('new info message')));
  }

  newWarning() {
    this.store.dispatch(new NewMessage(newWarning('new warning message')));
  }

  newError() {
    this.store.dispatch(new NewMessage(newError('new error message')));
  }
}

storiesOf('Messaging', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([ Effects ]),
      ],
      declarations: [
        MessageComponent,
        MessageToasterComponent,
        MessagingContainerComponent,
      ],
    })
  )

  .add('MessagingContainerComponent', () => ({
      component: MessagingContainerStorybookComponent,
      props: {},
    })
  );
