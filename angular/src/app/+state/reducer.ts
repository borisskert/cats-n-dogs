import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { reducer as authenticationReducer } from '../authentication/+state/reducer';
import { reducer as messagingReducer } from '../messaging/+state/reducer';
import { reducer as navigationReducer } from '../navigation/+state/reducer';
import { reducer as catReducer } from '../cats/+state/reducer';
import { reducer as appStateReducer } from '../version/+state/reducer';
import { reducer as storeReducer } from '../store/+state/reducer';
import { State } from './contract';

export const reducers: ActionReducerMap<State> = {
  authentication: authenticationReducer,
  messaging: messagingReducer,
  navigation: navigationReducer,
  cat: catReducer,
  state: appStateReducer,
  store: storeReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
