import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

Injectable();

export class UserService {
  private currentUser: {};
  path = environment.apiUrl;
  localStorageKey = 'currentUser';

  constructor(private http: HttpClient) {

  }

  setCurrentUser(user) {
    console.info('setCurrentUser', { user });
    this.currentUser = user;
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  getLastSavedUser() {
    const user = this.currentUser || JSON.parse(localStorage.getItem(this.localStorageKey));
    if (user && !user['errors']) {
      return user;
    } else {
      return null;
    }
  }

  getCurrentUser() {
    const user = this.currentUser || JSON.parse(localStorage.getItem(this.localStorageKey));
    if (!user || user['errors']) {
      return this.http.get(this.path + '/current-user').pipe(
        tap((newUser) => {
          this.setCurrentUser(newUser);
        })
      );
    } else {
      return of(user);
    }
  }
}
