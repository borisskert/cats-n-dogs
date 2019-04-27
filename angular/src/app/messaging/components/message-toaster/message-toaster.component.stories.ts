import { moduleMetadata, storiesOf } from '@storybook/angular';

import { array, object, date, select, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { MessageToasterComponent } from './message-toaster.component';
import { MessageComponent } from '../message/message.component';

storiesOf('Messaging', module)
  .addDecorator(
    moduleMetadata({
      imports: [],
      declarations: [
        MessageComponent
      ],
    })
  )

  .add('MessageToasterComponent', () => ({
      component: MessageToasterComponent,
      props: {
        messageIds: array('messageIds', [ 'message id 1', 'message id 2', 'message id 3' ]),
        messages: object('messages', [
          {
            id: 'message id 1',
            text: 'message with info text',
            type: 'info',
            timestamp: new Date(),
          }, {
            id: 'message id 2',
            text: 'message with warning text',
            type: 'warning',
            timestamp: new Date(),
          }, {
            id: 'message id 3',
            text: 'message with error text',
            type: 'error',
            timestamp: new Date(),
          }
        ]),
        closeMessage: action('close-message'),
        fixMessage: action('fix-message'),
        unfixMessage: action('unfix-message'),
      },
    })
  );
