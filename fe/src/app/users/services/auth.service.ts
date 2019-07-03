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
  localStorageKey = '';

  private currentUser = {};

  constructor(private http: HttpClient) {
    this.path = environment.apiUrl;
  }

  login(formValues: any) {

  }

  logout() {
    const hash = this.makeHash(this.currentUser.name)
    localStorage.setItem(this.localStorageKey, hash);
  }

  isLogged(): boolean {
    return false;
  }

  private makeHash(userName) {

  }
}
