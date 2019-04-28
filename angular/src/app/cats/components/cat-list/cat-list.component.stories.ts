import { moduleMetadata, storiesOf } from '@storybook/angular';

import { object, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ReactiveFormsModule } from '@angular/forms';
import { CatListItemComponent } from '../cat-list-item/cat-list-item.component';
import { CatListComponent } from './cat-list.component';

storiesOf('Cats', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        CatListItemComponent
      ],
    })
  )
  .add('CatListComponent', () => ({
      component: CatListComponent,
      props: {
        cats: object('cats', [ {
          id: 'cat id 1',
          name: 'cat name 1',
          race: 'cat race 1',
          age: 1,
          owner: 'cat owner 1',
        }, {
          id: 'cat id 2',
          name: 'cat name 2',
          race: 'cat race 2',
          age: 2,
          owner: 'cat owner 2',
        }, {
          id: 'cat id 3',
          name: 'cat name 3',
          race: 'cat race 3',
          age: 3,
          owner: 'cat owner 3',
        }, {
          id: 'cat id 4',
          name: 'cat name 4',
          race: 'cat race 4',
          age: 4,
          owner: 'cat owner 4',
        } ]),
        showDetails: action('show-details'),
        create: action('create'),
        delete: action('delete'),
      },
    })
  );
