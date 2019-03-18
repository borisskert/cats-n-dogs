import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CatState } from './contract';

const getCatState = createFeatureSelector<CatState>('cat');

export const getCats = createSelector(
  getCatState,
  state => state.cats,
);

export const getCatToCreate = createSelector(
  getCatState,
  state => state.catToCreate,
);
