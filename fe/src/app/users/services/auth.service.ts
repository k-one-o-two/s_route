import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from './user-service';

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
    window.open(environment.oauth.url);
  }

  setAuthCode(code: string) {
    localStorage.setItem(this.localStorageKey, code);
    return this.http.post(this.path + '/login', { code }).subscribe((data) => {
      this.userService.setCurrentUser(data['athlete']);
    });
  }

  getAuthCode() {
    return localStorage.getItem(this.localStorageKey);
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
