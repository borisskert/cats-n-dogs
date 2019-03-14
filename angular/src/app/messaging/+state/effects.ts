import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, pipe } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CloseMessage, MessagingAction, MessagingActionTypes, NewMessage } from './actions';

@Injectable()
export class Effects {
  constructor(
    private readonly actions$: Actions,
  ) {}

  @Effect()
  dismissMessageAutomatically$: Observable<MessagingAction> = this.actions$.pipe(
    ofType<NewMessage>(MessagingActionTypes.NewMessage),
    pipe(
      delay(5000),
      map(({ payload }) => {
        return new CloseMessage(payload.id);
      })
    )
  );
}
