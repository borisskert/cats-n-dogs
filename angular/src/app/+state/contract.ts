import { AuthenticationState, initialState as authenticationInitialState } from '../authentication/+state/contract';
import { MessagingState, initialState as messagingInitialState } from '../messaging/+state/contract';

export interface State {
  authentication: AuthenticationState;
  messaging: MessagingState;
}

export const initialState: State = {
  authentication: authenticationInitialState,
  messaging: messagingInitialState,
};
