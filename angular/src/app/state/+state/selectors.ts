import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './contract';

const getAppState = createFeatureSelector<AppState>('state');

export const getVersion = createSelector(
  getAppState,
  state => state.version,
);
