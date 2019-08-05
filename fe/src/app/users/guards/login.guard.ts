import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectIsAuthenticated } from '../state/user.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../common/app.state';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.store
      .pipe(
        select(selectIsAuthenticated),
        map((isAuthenticated: boolean) => {
          console.info({ isAuthenticated });
          if (isAuthenticated) {
            return true;
          } else {
            this.router.navigate(['login']);
            return false;
          }
        }));
  }
}
