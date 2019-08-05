import { createSelector } from '@ngrx/store';
import { AppState } from '../../common/app.state';
import { CurrentUserState } from './user.models';

export const selectFeature = (state: AppState) => state.user;

export const selectCurrentUser = createSelector(
  selectFeature,
  (state: CurrentUserState) => state.currentUser
);

export const selectIsAuthenticated = createSelector(
  selectFeature,
  (state: CurrentUserState) => state.isAuthenticated
);
