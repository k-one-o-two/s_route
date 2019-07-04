import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';

Injectable();

export class UserService {
  private currentUser: {};
  path = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  setCurrentUser(user) {
    this.currentUser = user;
  }

  getCurrentUser() {
    if (!this.currentUser) {
      return this.http.get(this.path + '/current-user');
    } else {
      return of(this.currentUser);
    }
  }
}
