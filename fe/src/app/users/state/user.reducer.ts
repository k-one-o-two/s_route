import { createReducer, on, Action } from '@ngrx/store';
import { CurrentUserState } from './user.models';
import { setUser, setAuthenticated } from './user.actions';

export const initialState: CurrentUserState = {
  currentUser: null,
  isAuthenticated: false
};

const reducer = createReducer(
  initialState,
  on(setUser, (state, { currentUser }) => ({
    ...state,
    currentUser
  })),
  on(setAuthenticated, (state, { isAuthenticated }) => ({
    ...state,
    isAuthenticated
  })),
);

export function userReducer(
  state: CurrentUserState | undefined,
  action: Action
): CurrentUserState {
  return reducer(state, action);
}
