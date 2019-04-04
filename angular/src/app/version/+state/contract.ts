export interface VersionState {
  current: string;
  latest: string;
}

export const initialState: VersionState = {
  current: null,
  latest: null,
};
