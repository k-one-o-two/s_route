import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface IUser {
  name: string
  stravaId: number
}

@Injectable()
export class AuthService {
  path: string;
  localStorageKey = 'stravaAuthCode';

  private currentUser = {};

  constructor(private http: HttpClient) {
    this.path = environment.apiUrl;
  }

  login() {
    window.open(environment.oauth.url);
  }

  setAuthCode(code: string) {
    localStorage.setItem(this.localStorageKey, code);
  }

  logout() {
    // const hash = this.makeHash(this.currentUser.name)
    // localStorage.setItem(this.localStorageKey, hash);
  }

  isLogged(): boolean {
    return !!localStorage.getItem(this.localStorageKey);
  }

  // private makeHash(userName) {
  //
  // }
}
