import { Component, OnInit, Input } from '@angular/core';
import { RoutesService } from '../../services/route-service';

import { FormGroup, FormControl } from '@angular/forms';

import { getUser } from '../../../users/state/user.actions';
import { selectCurrentUser } from '../../../users/state/user.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../common/app.state';

import { IComment } from '../../interfaces';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})

export class CommentsListComponent implements OnInit {
  @Input() routeId: string;

  public currentUser = null;

  addCommentForm = new FormGroup({
    comment: new FormControl('')
  });

  commentsList: IComment[] = [];

  constructor(private routesService: RoutesService, private store: Store<AppState>) { }

  ngOnInit() {
    this.getComments();

    this.store
      .pipe(select(selectCurrentUser))
      .subscribe((user: any) => {
        this.currentUser = user;
      });
  }

  getComments() {
    this.routesService.getComments(this.routeId)
      .subscribe((data: IComment[]) => this.commentsList = data);
  }

  addComment() {
    this.routesService.addComment(this.routeId, this.addCommentForm.value.comment, this.currentUser.id)
      .subscribe(() => {
        this.getComments();
      });
  }
}
