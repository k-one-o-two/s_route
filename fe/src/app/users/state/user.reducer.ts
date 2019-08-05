import { createReducer, on, Action } from '@ngrx/store';
import { CurrentUserState } from './user.models';
import { setUser, setAuthenticated, init } from './user.actions';

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
  on(init, (state) => {
    console.info('onInit', );
    const savedInSession = JSON.parse(localStorage.getItem('session'));
    if (savedInSession.currentUser && savedInSession.isAuthenticated) {
      return ({
        ...state,
        currentUser: savedInSession.currentUser,
        isAuthenticated: savedInSession.isAuthenticated
      });
    }
    return ({
      ...state
    });
  }),
);

export function userReducer(
  state: CurrentUserState | undefined,
  action: Action
): CurrentUserState {
  return reducer(state, action);
}
