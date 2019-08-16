import { Component, OnInit, Input } from '@angular/core';
import { RoutesService } from '../../services/route-service';

import { FormGroup, FormControl } from '@angular/forms';

import { getUser } from '../../../users/state/user.actions';
import { selectCurrentUser } from '../../../users/state/user.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../common/app.state';

import { IComment } from '../../interfaces';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent implements OnInit {
  @Input() comment: IComment;

  public currentUser = null;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store
      .pipe(select(selectCurrentUser))
      .subscribe((user: any) => {
        this.currentUser = user;
      });
  }
}
