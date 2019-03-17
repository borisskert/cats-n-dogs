import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  DetermineNavigationSelection,
  NavigationAction,
  NavigationActionTypes,
  SelectNavigationElement
} from './actions';
import { NavigationService } from '../services/navigation.service';
import { NewMessage } from '../../messaging/+state/actions';
import { newInfo } from '../../messaging/models/message.interface';
import { Action } from '@ngrx/store';

@Injectable()
export class Effects {

  constructor(
    private readonly actions$: Actions,
    private readonly navigationService: NavigationService,
  ) {}


  @Effect()
  navigate$: Observable<Action> = this.actions$.pipe(
    ofType<SelectNavigationElement>(NavigationActionTypes.SelectNavigationElement),
    map(({ payload }) => {
      this.navigationService.navigate(payload.selected);
      return new NewMessage(newInfo(`Navigated to ${payload.selected}`));
    })
  );

  @Effect()
  selectWhenDetermined: Observable<NavigationAction> = this.actions$.pipe(
    ofType<DetermineNavigationSelection>(NavigationActionTypes.DetermineNavigationSelection),
    map(() => {
      const selected = this.navigationService.getSelected();
      return new SelectNavigationElement({ selected });
    })
  );
}
