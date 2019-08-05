import { CurrentUserState } from '../users/state/user.models';

export interface AppState {
  user: CurrentUserState;
}
