import { Injectable } from '@angular/core';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { getUser, setUser } from './user.actions';
import { UserService } from '../services/user-service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private service: UserService
  ) { }

  getUser = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getUser),
        exhaustMap(() => {
          return this.service.fetchCurrentUser().pipe(
            map(user => {
              console.info('EFFECT', { user });
              return setUser({ currentUser: user });
            })
          )
        }
        )
      ),
    {}
  );
}
