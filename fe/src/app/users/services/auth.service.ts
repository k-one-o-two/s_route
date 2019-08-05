import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from './user-service';
import { tap } from 'rxjs/operators';

import { setUser, setAuthenticated } from '../state/user.actions';
// import { selectCurrentUser } from '../state/user.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../common/app.state';

interface IUser {
  name: string
  stravaId: number
}

@Injectable()
export class AuthService {
  path: string;
  localStorageKey = 'stravaAuthCode';

  private currentUser = {};

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.path = environment.apiUrl;
  }

  login() {
    window.location.href = environment.oauth.url;
  }

  setAuthCode(code: string) {
    localStorage.setItem(this.localStorageKey, code);
    return this.http.post(this.path + '/login', { code })
      .pipe(
        tap(data => {
          console.info({ data });
          this.store.dispatch(setUser({ currentUser: data['athlete'] }));
          this.store.dispatch(setAuthenticated({ isAuthenticated: true }));

          localStorage.setItem('session', JSON.stringify({
            currentUser: data['athlete'],
            isAuthenticated: true
          }));
        })
      );
  }

  getAuthCode() {
    return localStorage.getItem(this.localStorageKey);
  }

  logout() {
    localStorage.setItem(this.localStorageKey, null);
  }

  isLogged(): boolean {
    return !!localStorage.getItem(this.localStorageKey) && !!this.userService.getLastSavedUser();
  }
}
