import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from './user-service';
import { tap } from 'rxjs/operators';

interface IUser {
  name: string
  stravaId: number
}

@Injectable()
export class AuthService {
  path: string;
  localStorageKey = 'stravaAuthCode';

  private currentUser = {};

  constructor(private http: HttpClient, private userService: UserService) {
    this.path = environment.apiUrl;
  }

  login() {
    window.location.href = environment.oauth.url;
  }

  setAuthCode(code: string) {
    localStorage.setItem(this.localStorageKey, code);
    return this.http.post(this.path + '/login', { code })
      .pipe(
        tap(data => this.userService.setCurrentUser(data['athlete']))
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
