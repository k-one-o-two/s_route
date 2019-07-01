import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/route-service';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list-component.html',
  styleUrls: ['./route-list-component.scss']
})

export class RouteListComponent implements OnInit {
  routesList = [];

  constructor(private routesService: RoutesService) { }

  ngOnInit() {
    // this.routesList = this.routesService.getList();
  }
}
