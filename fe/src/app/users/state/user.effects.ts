import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { getUser, setUser } from './user.actions';
import { UserService } from '../services/user-service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private authService: AuthService
  ) { }

  getUser = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getUser),
        exhaustMap(() => {
          return this.userService.fetchCurrentUser().pipe(
            map(user => {
              if (user['errors']) {
                this.authService.logout();
                return setUser({ currentUser: null });
              }
              return setUser({ currentUser: user });
            })
          )
        }
        )
      ),
    {}
  );
}
