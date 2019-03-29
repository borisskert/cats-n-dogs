import { StoreAction, StoreActionType } from './actions';
import { initialState, StoreState } from './contract';
import { filter } from '../../common/object-utils';

export function reducer(state = initialState, action: StoreAction): StoreState {
  switch (action.type) {

    case StoreActionType.LoadStoreSuccessful: {
      return {
        ...state,
        [action.payload.store]: action.payload.value
      };
    }

    case StoreActionType.LoadFromStoreSuccessful: {
      return {
        ...state,
        [action.payload.store]: {
          ...state[action.payload.store],
          [action.payload.id]: action.payload.value
        }
      };
    }

    case StoreActionType.DeleteFromStore: {
      return {
        ...state,
        [action.payload.store]: filter({
          ...state[action.payload.store]
        }, id => id !== action.payload.id)
      };
    }

    default:
      return state;
  }
}
