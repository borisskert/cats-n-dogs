import { Cats } from '../../cats/models/cats';

export interface StoreState {
  cat: Cats;
}

export const initialState: StoreState = {
  cat: {},
};
