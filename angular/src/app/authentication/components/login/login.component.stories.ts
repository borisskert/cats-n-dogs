import { moduleMetadata, storiesOf } from '@storybook/angular';

import { number, text, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

storiesOf('Authentication', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
      ],
    })
  )
  .add('LoginComponent', () => ({
      component: LoginComponent,
      props: {
        login: action('login'),
      },
    })
  );
