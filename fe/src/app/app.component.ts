import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from './common/app.state';
import { getUser } from './users/state/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'routes';
  public createDialogVisible: boolean;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(getUser());
  }

  showCreateDialog() {
    console.info('showCreateDialog');
    this.createDialogVisible = true;
  }
}
