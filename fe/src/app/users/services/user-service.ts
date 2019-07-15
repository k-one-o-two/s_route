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

  constructor(private http: HttpClient) {

  }

  setCurrentUser(user) {
    this.currentUser = user;
  }

  getLastSavedUser() {
    if (this.currentUser && !this.currentUser['errors']) {
      return this.currentUser
    } else {
      return null;
    }
  }

  getCurrentUser() {
    if (!this.currentUser || this.currentUser['errors']) {
      console.info('HTTP user call');
      return this.http.get(this.path + '/current-user').pipe(
        tap((user) => {
          this.setCurrentUser(user);
        })
      );
    } else {
      return of(this.currentUser);
    }
  }
}
