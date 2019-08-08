import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../users/services/auth.service';
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
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(getUser());

    // todo takeUntill - so not to remove it manually
    this.store
      .pipe(select(selectCurrentUser))
      .subscribe((user: any) => {
        this.currentUser = user;
      });
  }

  emitCreateEvt() {
    this.createRoute.emit({ create: true });
  }

  logout() {
    this.currentUser = null;
    this.authService.logout();
  }
}
