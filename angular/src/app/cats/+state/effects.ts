import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  CatAction,
  CatActionType, DeleteCat, DeleteCatFailure, DeleteCatSuccessful,
  LoadCats,
  LoadCatsFailure,
  LoadCatsSuccessful,
  StoreCreatedCat,
  StoreCreatedCatFailure,
  StoreCreatedCatSuccessful,
  StoreUpdatedCat,
  StoreUpdatedCatFailure,
  StoreUpdatedCatSuccessful
} from './actions';
import { CatService } from '../services/cat.service';
import { MessagingAction, NewMessage } from '../../messaging/+state/actions';
import { newError } from '../../messaging/models/message.interface';

@Injectable()
export class Effects {

  constructor(
    private readonly actions$: Actions,
    private readonly catService: CatService,
  ) {}

  @Effect()
  loadCats$: Observable<CatAction> = this.actions$.pipe(
    ofType<LoadCats>(
      CatActionType.LoadCats,
      CatActionType.StoreCreatedCatSuccessful,
      CatActionType.StoreUpdatedCatSuccessful,
      CatActionType.DeleteCatSuccessful,
    ),
    switchMap(() => {
      return this.catService.loadCats()
        .pipe(
          map((cats) => new LoadCatsSuccessful(cats)),
          catchError(() => of(new LoadCatsFailure()))
        );
    })
  );

  @Effect()
  createCat$: Observable<CatAction> = this.actions$.pipe(
    ofType<StoreCreatedCat>(CatActionType.StoreCreatedCat),
    switchMap(({ payload }) => {
      return this.catService.createCat(payload)
        .pipe(
          map(() => new StoreCreatedCatSuccessful()),
          catchError((e) => of(new StoreCreatedCatFailure(e.text)))
        );
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

  @Effect()
  postCreationFailedErrorMessage$: Observable<MessagingAction> = this.actions$.pipe(
    ofType<StoreCreatedCatFailure>(CatActionType.StoreCreatedCatFailure),
    map(({ payload }) => new NewMessage(newError(payload.errorMessage)))
  );

  @Effect()
  deleteCat$: Observable<CatAction> = this.actions$.pipe(
    ofType<DeleteCat>(CatActionType.DeleteCat),
    switchMap(({ payload }) => {
      return this.catService.deleteCat(payload)
        .pipe(
          map(() => new DeleteCatSuccessful()),
          catchError(() => of(new DeleteCatFailure()))
        );
    })
  );
}
