import { CatState, initialState } from './contract';
import { CatAction, CatActionType } from './actions';
import { filter } from '../../common/object-utils';

export function reducer(state = initialState, action: CatAction): CatState {

  switch (action.type) {

    case CatActionType.NewCatToCreate: {
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

    case CatActionType.StoreCreatedCatSuccessful: {
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

    case CatActionType.LoadCatFromStoreSuccessful: {
      return {
        ...state,
        cats: {
          ...state.cats,
          [action.payload.id]: action.payload
        }
      };
    }

    case CatActionType.DeleteCatFromStore: {
      return {
        ...state,
        cats: filter({
          ...state.cats
        }, id => id !== action.payload)
      };
    }

    default:
      return state;
  }
}
