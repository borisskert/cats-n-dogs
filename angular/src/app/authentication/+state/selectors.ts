import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from './contract';

const getAuthenticationState = createFeatureSelector<AuthenticationState>('authentication');

export const isAuthenticated = createSelector(
  getAuthenticationState,
  state => state.isAuthenticated
);

export const userInfo = createSelector(
  getAuthenticationState,
  state => state.userInfo
);
