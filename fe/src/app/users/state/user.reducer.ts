import { createReducer, on, Action } from '@ngrx/store';
import { CurrentUserState } from './user.models';
import { setUser, setAuthenticated, init } from './user.actions';
import { UserService } from '../services/user-service';

export const initialState: CurrentUserState = {
  currentUser: null,
  isAuthenticated: false
};

const reducer = createReducer(
  initialState,
  on(setUser, (state, { currentUser }) => {
    console.info('gonna set user', { currentUser });

    localStorage.setItem('session', JSON.stringify({
      currentUser: currentUser,
      isAuthenticated: true
    }));

    return ({
      ...state,
      currentUser,
      isAuthenticated: true
    });
  }),
  on(setAuthenticated, (state, { isAuthenticated }) => ({
    ...state,
    isAuthenticated
  })),
  on(init, (state) => {
    const savedInSession = JSON.parse(localStorage.getItem('session'));
    console.info({ savedInSession });
    if (savedInSession.isAuthenticated) {

      // todo validation

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
