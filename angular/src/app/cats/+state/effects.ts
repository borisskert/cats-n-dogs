import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  CatAction,
  CatActionType,
  LoadCats, LoadCatsFailure,
  LoadCatsSuccessful,
  SaveCat,
  SaveCatFailure,
  SaveCatSuccessful
} from './actions';
import { CatService } from '../services/cat.service';

@Injectable()
export class Effects {

  constructor(
    private readonly actions$: Actions,
    private readonly catService: CatService,
  ) {}

  @Effect()
  loadCats$: Observable<CatAction> = this.actions$.pipe(
    ofType<LoadCats>(CatActionType.LoadCats, CatActionType.SaveCatSuccessful),
    switchMap(() => {
      return this.catService.loadCats()
        .pipe(
          map((cats) => new LoadCatsSuccessful(cats)),
          catchError(() => of(new LoadCatsFailure()))
        );
    })
  );

  @Effect()
  saveCat$: Observable<CatAction> = this.actions$.pipe(
    ofType<SaveCat>(CatActionType.SaveCat),
    switchMap(({ payload }) => {
      return this.catService.saveCat(payload)
        .pipe(
          map(() => new SaveCatSuccessful()),
          catchError(() => of(new SaveCatFailure()))
        );
    })
  );
}
