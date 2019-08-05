export interface User {
  errors?: string;
}
export interface CurrentUserState {
  isAuthenticated: boolean;
  currentUser?: User;
}
