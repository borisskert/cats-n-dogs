import { AuthenticationState, initialState as authenticationInitialState } from '../authentication/+state/contract';
import { MessagingState, initialState as messagingInitialState } from '../messaging/+state/contract';
import { NavigationState, initialState as navigationInitialState } from '../navigation/+state/contract';
import { CatState, initialState as catInitialState } from '../cats/+state/contract';
import { VersionState, initialState as appInitialState } from '../version/+state/contract';
import { StoreState, initialState as storeInitialState } from '../store/+state/contract';

export interface State {
  authentication: AuthenticationState;
  messaging: MessagingState;
  navigation: NavigationState;
  cat: CatState;
  state: VersionState;
  store: StoreState;
}

export const initialState: State = {
  authentication: authenticationInitialState,
  messaging: messagingInitialState,
  navigation: navigationInitialState,
  cat: catInitialState,
  state: appInitialState,
  store: storeInitialState,
};
