import { UserInfo } from '../models/user-info.interface';

export interface AuthenticationState {
  isAuthenticated: boolean;
  userInfo: UserInfo;
}

export const initialState: AuthenticationState = {
  isAuthenticated: false,
  userInfo: null,
};
