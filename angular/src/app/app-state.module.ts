import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './+state/reducer';
import { initialState } from './+state/contract';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    StoreModule.forRoot(
      reducers,
      {
        initialState,
        metaReducers,
      }
    ),
    EffectsModule.forRoot([]),
  ]
})
export class AppStateModule {}
