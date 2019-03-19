import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CatState } from './contract';

const getCatState = createFeatureSelector<CatState>('cat');

export const getCats = createSelector(
  getCatState,
  state => Object.values(state.cats),
);

export const getCatToCreate = createSelector(
  getCatState,
  state => state.catToCreate,
);

export const getSelectedCatId = createSelector(
  getCatState,
  state => state.selectedCatId,
);

export const getSelectedCat = createSelector([
    getCatState,
    getSelectedCatId
  ],
  (state, catId) => {
    return state.cats[catId] || null;
  },
);
