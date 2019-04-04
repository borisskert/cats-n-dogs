import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VersionState } from './contract';

const getAppState = createFeatureSelector<VersionState>('state');

export const getCurrentVersion = createSelector(
  getAppState,
  state => state.current,
);

export const getLatestVersion = createSelector(
  getAppState,
  state => state.latest,
);
