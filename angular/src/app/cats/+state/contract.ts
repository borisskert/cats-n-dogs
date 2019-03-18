import { Cat } from '../models/cat';

export interface CatState {
  cats: Cat[];
  catToCreate: Cat;
}

export const initialState: CatState = {
  cats: [],
  catToCreate: null,
};
