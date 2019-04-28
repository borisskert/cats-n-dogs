import { storiesOf } from '@storybook/angular';

import { number, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { CatListItemComponent } from './cat-list-item.component';

storiesOf('Cats', module)
  .add('CatListItemComponent', () => ({
      component: CatListItemComponent,
      props: {
        cat: {
          id: text('id', 'cat id'),
          name: text('name', 'cat name'),
          race: text('race', 'cat race'),
          age: number('age', 3),
          owner: text('owner', 'cat owner'),
        },
        showDetails: action('show-details'),
        delete: action('delete'),
      },
    })
  );
