import { moduleMetadata, storiesOf } from '@storybook/angular';

import { date, select, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { NavigationComponent } from './navigation.component';
import { NavigationElementComponent } from '../navigation-element/navigation-element.component';

storiesOf('Navigation', module)
  .addDecorator(
    moduleMetadata({
      imports: [],
      declarations: [
        NavigationElementComponent,
      ],
    })
  )

  .add('NavigationComponent', () => ({
      component: NavigationComponent,
      props: {
        navigationElements: [
          {
            text: 'Home',
            type: 'HOME',
            enabled: true,
            hidden: false,
            order: 0,
          }, {
            text: 'Cats',
            type: 'CATS',
            enabled: true,
            hidden: false,
            order: 1,
          }, {
            text: 'Dogs',
            type: 'DOGS',
            enabled: true,
            hidden: false,
            order: 2,
          }
        ],
        selectedType: 'HOME',
        navigate: action('navigate'),
      },
    })
  );
