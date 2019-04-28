import { moduleMetadata, storiesOf } from '@storybook/angular';
import { Component } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { State } from '../../../+state/contract';
import { LoadStoreSuccessful } from '../../../store/+state/actions';
import { getCats } from '../../cats.mock';
import { metaReducers, reducers } from '../../../+state/reducer';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { CatsContainerComponent } from './cats-container.component';
import { CatListComponent } from '../../components/cat-list/cat-list.component';
import { CatListItemComponent } from '../../components/cat-list-item/cat-list-item.component';
import { CatDetailsComponent } from '../../components/cat-details/cat-details.component';
import { Effects } from '../../+state/effects';

@Component({
  selector: 'app-storybook-cats-container',
  template: `
    <div>
      <button (click)="threeCats()">simulate load 3 cats</button>
      <button (click)="emptyCats()">simulate empty cats</button>
      <!--<button (click)="createCat()">simulate expiry</button>-->
      <!--<button (click)="logout()">simulate logout</button>-->
    </div>
    <app-cats-container></app-cats-container>
  `,
})
class CatsContainerStorybookComponent {
  constructor(private readonly store: Store<State>) {
    this.store = store;
  }

  emptyCats() {
    this.store.dispatch(new LoadStoreSuccessful({ store: 'cat', value: {} }));
  }

  threeCats() {
    this.store.dispatch(new LoadStoreSuccessful({ store: 'cat', value: getCats() }));
  }
}


storiesOf('Cats', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot([ Effects ]),
        ReactiveFormsModule,
      ],
      declarations: [
        CatsContainerComponent,
        CatListComponent,
        CatListItemComponent,
        CatDetailsComponent,
      ],
    })
  )

  .add('CatsContainerComponent', () => ({
      component: CatsContainerStorybookComponent,
      props: {},
    })
  );
