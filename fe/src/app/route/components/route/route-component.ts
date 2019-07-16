import { Component, OnInit, Input, ElementRef, AfterViewInit } from '@angular/core';
import { RoutesService } from '../../services/route-service';

import { IRoute } from '../../interfaces';

@Component({
  selector: 'app-route',
  templateUrl: './route-component.html',
  styleUrls: ['./route-component.css']
})

export class RouteComponent implements OnInit, AfterViewInit {
  @Input() id;
  routeInfo = null;
  dataReady = false;

  constructor(
    private routesService: RoutesService,
    private element: ElementRef
  ) { }

  ngOnInit() {
    this.routesService.getInfo(this.id)
      .subscribe((data: IRoute) => {
        console.info({ data });
        this.routeInfo = data;
        this.dataReady = true;
      })
  }

  ngAfterViewInit() {
    if (!this.routeInfo) {
      return;
    }

    const div = this.element.nativeElement.querySelector('.map');
    const gpx = `http://localhost:3000/media-gpx/?name=${this.routeInfo['gpxName']}`;

    this.routesService.drawMap(div, gpx);
  }
}
