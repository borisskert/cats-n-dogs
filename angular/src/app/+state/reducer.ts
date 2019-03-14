import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { reducer as authenticationReducer } from '../authentication/+state/reducer';
import { reducer as messagingReducer } from '../messaging/+state/reducer';
import { State } from './contract';

export const reducers: ActionReducerMap<State> = {
  authentication: authenticationReducer,
  messaging: messagingReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
