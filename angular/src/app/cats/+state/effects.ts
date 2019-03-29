import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  CatAction,
  CatActionType,
  CreateCatSuccessful,
  StoreUpdatedCat,
  StoreUpdatedCatFailure,
  StoreUpdatedCatSuccessful
} from './actions';
import { CatService } from '../services/cat.service';
import { CreateItemSuccessful, StoreActionType } from '../../store/+state/actions';

@Injectable()
export class Effects {

  constructor(
    private readonly actions$: Actions,
    private readonly catService: CatService,
  ) {}

  @Effect()
  catCreated: Observable<CatAction> = this.actions$.pipe(
    ofType<CreateItemSuccessful>(StoreActionType.CreateItemSuccessful),
    switchMap(({ payload }) => {
      if (payload.store === 'cat') {
        return [ new CreateCatSuccessful() ];
      }
    })
  );

  @Effect()
  updateCat$: Observable<CatAction> = this.actions$.pipe(
    ofType<StoreUpdatedCat>(CatActionType.StoreUpdatedCat),
    switchMap(({ payload }) => {
      return this.catService.updateCat(payload)
        .pipe(
          map(() => new StoreUpdatedCatSuccessful()),
          catchError(() => of(new StoreUpdatedCatFailure()))
        );
    })
  );
}
