import { AuthenticationState, initialState as authenticationInitialState } from '../authentication/+state/contract';

export interface State {
  authentication: AuthenticationState;
}

export const initialState: State = {
  authentication: authenticationInitialState,
};
