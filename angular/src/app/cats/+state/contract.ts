import { Cat } from '../models/cat';
import { Cats } from '../models/cats';

export interface CatState {
  cats: Cats;
  catToCreate: Cat;
  selectedCatId: string;
}

export const initialState: CatState = {
  cats: {},
  catToCreate: null,
  selectedCatId: null,
};
