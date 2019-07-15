import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../../services/route-service';

import { IRoute } from '../../interfaces';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list-component.html',
  styleUrls: ['./route-list-component.css']
})

export class RouteListComponent implements OnInit {
  routesList: IRoute[] = [];
  cardsOnRow = 3;

  constructor(private routesService: RoutesService) { }

  ngOnInit() {
    console.info('inited');
    this.routesService.getList()
      .subscribe((data: IRoute[]) => this.routesList = data);
  }
}
