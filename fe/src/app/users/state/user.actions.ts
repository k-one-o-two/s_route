import { createAction, props } from '@ngrx/store';
import { User } from './user.models';

export const getUser = createAction(
  '[User] Get user req'
);

export const setUser = createAction(
  '[User] Set user',
  props<{ currentUser: User }>()
);

export const setAuthenticated = createAction(
  '[User] Set authenticated',
  props<{ isAuthenticated: boolean }>()
);

export const init = createAction(
  '[User] Init from localstorage'
);
