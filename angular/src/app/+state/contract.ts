import { AuthenticationState, initialState as authenticationInitialState } from '../authentication/+state/contract';
import { MessagingState, initialState as messagingInitialState } from '../messaging/+state/contract';
import { NavigationState, initialState as navigationInitialState } from '../navigation/+state/contract';

export interface State {
  authentication: AuthenticationState;
  messaging: MessagingState;
  navigation: NavigationState;
}

export const initialState: State = {
  authentication: authenticationInitialState,
  messaging: messagingInitialState,
  navigation: navigationInitialState,
};
