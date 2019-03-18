import { Cat } from '../models/cat';

export interface CatState {
  cats: Cat[];
  catToCreate: Cat;
  selectedCatId: string;
}

export const initialState: CatState = {
  cats: [],
  catToCreate: null,
  selectedCatId: null,
};
