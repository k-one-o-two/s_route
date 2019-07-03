import { Component, OnInit, Input } from '@angular/core';
import { RoutesService } from '../../services/route-service';

import { IComment } from '../../interfaces';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comment-list-component.html',
  styleUrls: ['./comment-list-component.css']
})

export class CommentsListComponent implements OnInit {
  @Input() routeId: number;

  commentsList: IComment[] = [];

  constructor(private routesService: RoutesService) { }

  ngOnInit() {
    // console.info('inited');
    this.routesService.getComments(this.routeId)
      .subscribe((data: IComment[]) => this.commentsList = data);
  }
}
