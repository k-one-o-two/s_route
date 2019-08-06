import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../../services/route-service';
import { ActivatedRoute, Router } from '@angular/router';

import { IRoute } from '../../interfaces';

@Component({
  selector: 'app-route-view',
  templateUrl: './route-view.component.html',
  styleUrls: ['./route-view.component.css']
})

export class RouteViewComponent implements OnInit {
  public id: string;
  constructor(private routesService: RoutesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
  }
}
