import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectIsAuthenticated } from '../state/user.selectors';
import { getUser } from '../state/user.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../common/app.state';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(): Observable<boolean> {
    const savedInSession = JSON.parse(localStorage.getItem('session'));
    console.info({ savedInSession });
    return savedInSession && savedInSession.isAuthenticated;
  }
}
