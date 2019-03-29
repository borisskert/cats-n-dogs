import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CatState } from './contract';
import { StoreState } from '../../store/+state/contract';

const getCatState = createFeatureSelector<CatState>('cat');
const getStoreState = createFeatureSelector<StoreState>('store');

export const getCats = createSelector(
  getStoreState,
  state => Object.values(state.cat),
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
    getStoreState,
    getSelectedCatId
  ],
  (state, catId) => {
    return state.cat[catId] || null;
  },
);
