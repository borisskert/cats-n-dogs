import { Cat } from '../models/cat';

export interface CatState {
  catToCreate: Cat;
  selectedCatId: string;
}

export const initialState: CatState = {
  catToCreate: null,
  selectedCatId: null,
};
