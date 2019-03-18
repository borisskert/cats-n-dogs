import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatsContainerComponent } from './containers/cats-container/cats-container.component';
import { CatListComponent } from './components/cat-list/cat-list.component';
import { CatDetailsComponent } from './components/cat-details/cat-details.component';
import { CatListItemComponent } from './components/cat-list-item/cat-list-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './+state/effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([ Effects ]),
  ],
  declarations: [
    CatsContainerComponent,
    CatListComponent,
    CatDetailsComponent,
    CatListItemComponent
  ],
  exports: [
    CatsContainerComponent
  ]
})
export class CatsModule {}
