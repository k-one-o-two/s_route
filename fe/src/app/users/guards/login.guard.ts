import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectIsAuthenticated } from '../state/user.selectors';
import { setUser, setAuthenticated } from '../state/user.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../common/app.state';
import { UserService } from '../services/user-service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private userService: UserService) { }

  canActivate(): Observable<boolean> {
    console.info('canActivate called');
    // this.store.dispatch(getUser());
    return this.userService.fetchCurrentUser()
      .pipe(
        map(user => {
          console.info({ user });
          if (user && !user['errors']) {
            this.store.dispatch(setUser({ currentUser: user }));
            this.store.dispatch(setAuthenticated({ isAuthenticated: true }));
            this.router.navigate(['/routes']);
            return false;
          }
          return true;
        })
      );
  }
}
