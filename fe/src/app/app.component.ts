import { Component, OnInit, ElementRef } from '@angular/core';
import { RoutesService } from './route/services/route-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'routes';

  constructor(private routesService: RoutesService, private element: ElementRef) {

  }

  ngOnInit() {
    const div = this.element.nativeElement.querySelector('#mapid');
    const gpx = 'http://localhost:4200/assets/test.gpx';

    this.routesService.drawMap(div, gpx);
  }
}
