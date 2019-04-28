import { AuthenticationState, initialState as authenticationInitialState } from '../authentication/+state/contract';
import { initialState as messagingInitialState, MessagingState } from '../messaging/+state/contract';
import { initialState as navigationInitialState, NavigationState } from '../navigation/+state/contract';
import { CatState, initialState as catInitialState } from '../cats/+state/contract';
import { initialState as appInitialState, VersionState } from '../version/+state/contract';
import { initialState as storeInitialState, StoreState } from '../store/+state/contract';

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
