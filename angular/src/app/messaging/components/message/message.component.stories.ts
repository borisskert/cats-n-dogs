import { storiesOf } from '@storybook/angular';

import { MessageComponent } from './message.component';
import { date, select, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

const messageTypes = {
  Info: 'info',
  Warning: 'warning',
  Error: 'error'
};

storiesOf('Messaging', module)
  .add('MessageComponent', () => ({
      component: MessageComponent,
      props: {
        message: {
          id: text('id', 'message id'),
          text: text('text', 'message with info text'),
          type: select('type', messageTypes, 'info'),
          timestamp: date('timestamp', new Date()),
        },
        close: action('close'),
        isHovered: action('isHovered'),
      },
    })
  );
