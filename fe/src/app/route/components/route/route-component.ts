import { Component, OnInit, Input, ElementRef, AfterViewInit } from '@angular/core';
import { RoutesService } from '../../services/route-service';
import { IRoute } from '../../interfaces';

@Component({
  selector: 'app-route',
  templateUrl: './route-component.html',
  styleUrls: ['./route-component.css']
})

export class RouteComponent implements OnInit {
  @Input() id;
  route = null;
  dataReady = false;
  dataObservable;
  mapRendered = false;

  constructor(
    private routesService: RoutesService,
    private element: ElementRef
  ) { }

  get routeTitle() {
    return this.route ? this.route['title'] : '';
  }

  get routeDescription() {
    return this.route ? this.route['description'] : '';
  }

  get routeAuthor() {
    if (!this.route) {
      return '';
    } else if (this.route.info) {
      return `${this.route.info.info.athlete.firstname} ${this.route.info.info.athlete.lastname}`
    }
  }

  ngOnInit() {
    this.routesService.getInfo(this.id)
      .subscribe((data: IRoute) => {
        this.route = data;
        this.dataReady = true;

        const div = this.element.nativeElement.querySelector('.map');
        this.routesService.drawMap(div, this.route.gpx);
      })
  }
}
