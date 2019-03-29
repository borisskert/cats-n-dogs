import { CatState, initialState } from './contract';
import { CatAction, CatActionType } from './actions';

export function reducer(state = initialState, action: CatAction): CatState {

  switch (action.type) {

    case CatActionType.NewCatToCreate: {
      return {
        ...state,
        catToCreate: action.payload,
      };
    }

    case CatActionType.CreateCatSuccessful: {
      return {
        ...state,
        catToCreate: null,
      };
    }

    case CatActionType.StoreUpdatedCatSuccessful: {
      return {
        ...state,
        selectedCatId: null,
      };
    }

    case CatActionType.SelectCat: {
      return {
        ...state,
        selectedCatId: action.payload,
      };
    }

    case CatActionType.UnselectCat: {
      return {
        ...state,
        selectedCatId: null,
      };
    }

    case CatActionType.CancelCatCreation: {
      return {
        ...state,
        catToCreate: null,
      };
    }

    default:
      return state;
  }
}
