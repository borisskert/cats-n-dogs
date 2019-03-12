import { AuthenticationState, initialState } from './contract';
import { AuthenticationActions, AuthenticationActionTypes } from './actions';

export function reducer(state = initialState, action: AuthenticationActions): AuthenticationState {
  switch (action.type) {
    case AuthenticationActionTypes.UserInfoLoadSuccessful: {
      return {
        ...state,
        isAuthenticated: true,
        userInfo: action.payload
      };
    }

    case AuthenticationActionTypes.UserInfoLoadFailure: {
      return {
        ...state,
        isAuthenticated: false,
        userInfo: null
      };
    }

    default:
      return state;
  }
}
