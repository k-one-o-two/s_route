import { Component, OnInit, Input } from '@angular/core';
import { RoutesService } from '../../services/route-service';

import { IComment } from '../../interfaces';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})

export class AddCommentComponent implements OnInit {
  @Input() routeId: number;

  commentsList: IComment[] = [];

  constructor(private routesService: RoutesService) { }

  ngOnInit() {
  }
}
