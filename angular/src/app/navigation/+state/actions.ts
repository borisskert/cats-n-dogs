import { Action } from '@ngrx/store';
import { NavigationElement } from '../models/navigation-element';
import { NavigationElementType } from '../models/navigation-element-type';

export enum NavigationActionTypes {
  InitNavigation = '[Navigation] Init Navigation',
  SelectNavigationElement = '[Navigation] Select Navigation Element',
  DetermineNavigationSelection = '[Navigation] Determine Navigation Selection',
}

export type NavigationAction =
  | InitNavigation
  | SelectNavigationElement
  | DetermineNavigationSelection
  ;

export class InitNavigation implements Action {
  readonly type = NavigationActionTypes.InitNavigation;
  constructor(public payload: { elements: NavigationElement[] }) {}
}

export class DetermineNavigationSelection implements Action {
  readonly type = NavigationActionTypes.DetermineNavigationSelection;
}

export class SelectNavigationElement implements Action {
  readonly type = NavigationActionTypes.SelectNavigationElement;
  constructor(public payload: { selected: NavigationElementType }) {}
}
