import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as leaflet from 'leaflet-gpx';

@Injectable()
export class RoutesService {
  path: string;

  constructor(private http: HttpClient) {
    this.path = ''
  }

  getList() {
    return this.http.get(this.path + '/routes');
  }

  getInfo(routeId: number) {
    return this.http.get(this.path + '/route?id=' + routeId);
  }

  drawMap(element, gpx) {
    const map = leaflet.map(element);//.setView([51.505, -0.09], 13);

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // const gpx = 'http://localhost:4200/assets/test.gpx'; // URL to your GPX file or the GPX itself
    new leaflet.GPX(gpx, { async: true }).on('loaded', function(e) {
      map.fitBounds(e.target.getBounds());
    }).addTo(map);
  }
}
