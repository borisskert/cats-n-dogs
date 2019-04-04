import { AppAction, AppActionType } from './actions';
import { initialState, VersionState } from './contract';

export function reducer(state = initialState, action: AppAction): VersionState {
  switch (action.type) {

    case AppActionType.ReadCurrentStateVersionSuccessful: {
      return {
        ...state,
        current: action.payload.currentVersion,
      };
    }

    case AppActionType.LoadLatestStateVersionSuccessful: {
      return {
        ...state,
        latest: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
