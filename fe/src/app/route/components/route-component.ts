import { Component, OnInit, Input } from '@angular/core';
import { RoutesService } from '../services/route-service';

@Component({
  selector: 'app-route',
  templateUrl: './route-component.html',
  styleUrls: ['./route-component.scss']
})

export class RouteComponent implements OnInit {
  @Input() routeid;
  routeInfo = {};

  constructor(private routesService: RoutesService) { }

  ngOnInit() {
    this.routeInfo = this.routesService.getInfo(this.routeid);
  }
}
