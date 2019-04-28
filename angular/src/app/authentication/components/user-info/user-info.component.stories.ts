import { storiesOf } from '@storybook/angular';

import { boolean, array, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { UserInfoComponent } from './user-info.component';

storiesOf('Authentication', module)
  .add('UserInfoComponent', () => ({
      component: UserInfoComponent,
      props: {
        userInfo: {
          subject: text('subject', 'subject'),
          name: text('name', 'name'),
          username: text('username', 'username'),
          givenName: text('givenName', 'givenName'),
          familyName: text('familyName', 'familyName'),
          email: text('email', 'email'),
          roles: array('roles', [ 'role 1', 'role 2' ]),
        },
        isAuthenticated: boolean('isAuthenticated', true),
      },
    })
  )
;
