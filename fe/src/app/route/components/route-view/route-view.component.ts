import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../../services/route-service';

import { IRoute } from '../../interfaces';

@Component({
  selector: 'app-route-view',
  templateUrl: './route-view.component.html',
  styleUrls: ['./route-view.component.css']
})

export class RouteViewComponent implements OnInit {
  constructor(private routesService: RoutesService) { }

  ngOnInit() {
  }
}
