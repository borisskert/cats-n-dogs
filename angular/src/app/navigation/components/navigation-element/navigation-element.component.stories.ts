import { storiesOf } from '@storybook/angular';

import { boolean, date, object, select, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { NavigationElementComponent } from './navigation-element.component';

storiesOf('Navigation', module)
  .add('NavigationElementComponent', () => ({
      component: NavigationElementComponent,
      props: {
        navigationElement: object('navigationElement', {
          text: 'Home',
          type: 'HOME',
          enabled: true,
          hidden: false,
          order: 0,
        }),
        isSelected: boolean('isSelected', true),
        select: action('select'),
      },
    })
  );
