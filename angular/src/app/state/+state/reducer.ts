import { AppAction, AppActionType } from './actions';
import { AppState, initialState } from './contract';

export function reducer(state = initialState, action: AppAction): AppState {
  switch (action.type) {

    case AppActionType.LoadLatestStateVersionSuccessful: {
      return {
        ...state,
        version: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
