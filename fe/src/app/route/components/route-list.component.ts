import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/route-service';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list-component.html',
  styleUrls: ['./route-list-component.css']
})

export class RouteListComponent implements OnInit {
  routesList = [];

  constructor(private routesService: RoutesService) { }

  ngOnInit() {
    console.info('inited');
    // this.routesService.getList()
      // .subscribe(data => this.routesList = data);
  }
}
