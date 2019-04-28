import { moduleMetadata, storiesOf } from '@storybook/angular';

import { number, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { CatDetailsComponent } from './cat-details.component';
import { ReactiveFormsModule } from '@angular/forms';

storiesOf('Cats', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
      ],
    })
  )
  .add('CatDetailsComponent', () => ({
      component: CatDetailsComponent,
      props: {
        cat: {
          id: text('id', 'cat id'),
          name: text('name', 'cat name'),
          race: text('race', 'cat race'),
          age: number('age', 3),
          owner: text('owner', 'cat owner'),
        },
        save: action('save'),
        cancel: action('cancel'),
      },
    })
  );
