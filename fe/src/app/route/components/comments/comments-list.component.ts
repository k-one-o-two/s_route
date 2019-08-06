import { Component, OnInit, Input } from '@angular/core';
import { RoutesService } from '../../services/route-service';

import { FormGroup, FormControl, Validator, ValidatorFn, ValidationErrors } from '@angular/forms';

import { IComment } from '../../interfaces';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})

export class CommentsListComponent implements OnInit {
  @Input() routeId: string;

  addCommentForm = new FormGroup({
    comment: new FormControl('')
  });

  commentsList: IComment[] = [];

  constructor(private routesService: RoutesService) { }

  ngOnInit() {
    this.getComments();
  }

  getComments() {
    this.routesService.getComments(this.routeId)
      .subscribe((data: IComment[]) => this.commentsList = data);
  }

  addComment() {
    this.routesService.addComment(this.routeId, this.addCommentForm.value.comment)
      .subscribe(() => {
        this.getComments();
      });
  }
}
