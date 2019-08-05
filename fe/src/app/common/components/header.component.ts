import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../users/services/user-service';
import { getUser } from '../../users/state/user.actions';
import { selectCurrentUser } from '../../users/state/user.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public currentUser = null;
  @Output() createRoute = new EventEmitter();

  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(getUser());

    this.store
      .pipe(select(selectCurrentUser))
      .subscribe((user: any) => {
        console.info({ user });
        this.currentUser = user;
      });
  }

  emitCreateEvt() {
    console.info('emitCreateEvt');
    this.createRoute.emit({ create: true });
  }
}
