import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CatAction, CreateCatSuccessful, UpdatedCatSuccessful } from './actions';
import { CreateItemSuccessful, StoreActionType, UpdateItemSuccessful } from '../../store/+state/actions';

@Injectable()
export class Effects {

  constructor(
    private readonly actions$: Actions,
  ) {}

  @Effect()
  catCreated: Observable<CatAction> = this.actions$.pipe(
    ofType<CreateItemSuccessful>(StoreActionType.CreateItemSuccessful),
    filter(({ payload }) => payload.store === 'cat'),
    map(() => new CreateCatSuccessful())
  );

  @Effect()
  updateCat$: Observable<CatAction> = this.actions$.pipe(
    ofType<UpdateItemSuccessful>(StoreActionType.UpdateItemSuccessful),
    filter(({ payload }) => payload.store === 'cat'),
    map(() => new UpdatedCatSuccessful())
  );
}
