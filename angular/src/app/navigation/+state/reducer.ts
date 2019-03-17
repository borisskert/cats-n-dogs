import { NavigationAction, NavigationActionTypes } from './actions';
import { initialState, NavigationState } from './contract';

export function reducer(state = initialState, action: NavigationAction): NavigationState {
  switch (action.type) {
    case NavigationActionTypes.InitNavigation: {
      return {
        ...state,
        elements: action.payload.elements,
      }
    }

    case NavigationActionTypes.SelectNavigationElement: {
      return {
        ...state,
        selectedElementType: action.payload.selected,
      }
    }

    default:
      return state;
  }
}
