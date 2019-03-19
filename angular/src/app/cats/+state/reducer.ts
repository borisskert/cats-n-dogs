import { CatState, initialState } from './contract';
import { CatAction, CatActionType } from './actions';

export function reducer(state = initialState, action: CatAction): CatState {
  switch (action.type) {

    case CatActionType.CreateCat: {
      return {
        ...state,
        catToCreate: action.payload,
      };
    }

    case CatActionType.LoadCatsSuccessful: {
      return {
        ...state,
        cats: action.payload,
      };
    }

    case CatActionType.SaveCatSuccessful: {
      return {
        ...state,
        catToCreate: null,
        selectedCatId: null,
      };
    }

    case CatActionType.SelectCat: {
      return {
        ...state,
        selectedCatId: action.payload,
      };
    }

    default:
      return state;
  }
}
