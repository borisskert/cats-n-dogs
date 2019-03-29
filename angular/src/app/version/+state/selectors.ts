import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VersionState } from './contract';

const getAppState = createFeatureSelector<VersionState>('state');

export const getVersion = createSelector(
  getAppState,
  state => state.version,
);
