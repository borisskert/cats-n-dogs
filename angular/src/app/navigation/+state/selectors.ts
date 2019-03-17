import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NavigationState } from './contract';

const getNavigationState = createFeatureSelector<NavigationState>('navigation');

export const getNavigationElements = createSelector(
  getNavigationState,
  state => state.elements,
);

export const getSelectedNavigationType = createSelector(
  getNavigationState,
  state => state.selectedElementType,
);
