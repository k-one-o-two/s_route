import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as leaflet from 'leaflet-gpx';

@Injectable()
export class RoutesService {
  path: string;

  constructor(private http: HttpClient) {
    this.path = environment.apiUrl;
  }

  getList() {
    return this.http.get(this.path + '/routes');
  }

  getInfo(routeId: string) {
    return this.http.get(this.path + '/route?id=' + routeId);
  }

  getComments(routeId: string) {
    return this.http.get(this.path + '/route-comments?routeId=' + routeId);
  }

  addComment(routeId: string, comment: string, userId: number) {
    return this.http.post(this.path + '/route-comments', {
      routeId,
      userId,
      comment
    });
  }

  checkRouteUrl(url) {
    const stravaRouteUrlReg = new RegExp('https:\/\/www.strava.com\/routes\/(\\d+)', 'i');
    const match = stravaRouteUrlReg.exec(url);

    if (match && match[1]) {
      return match[1];
    } else {
      return false;
    }
  }

  getRouteByUrl(url) {
    const routeId = this.checkRouteUrl(url);
    if (routeId) {
      return this.getInfo(parseInt(routeId, 10));
    }
  }

  getGpx(routeId) {
    return this.http.get(this.path + '/route-gpx?id=' + routeId);
  }

  drawMap(element, gpx) {
    const map = leaflet.map(element);

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // const gpx = 'http://localhost:4200/assets/test.gpx'; // URL to your GPX file or the GPX itself
    new leaflet.GPX(gpx, { async: true }).on('loaded', function(e) {
      map.fitBounds(e.target.getBounds());
    }).addTo(map);
  }

  save(route) {
    return this.http.post(this.path + '/route', route);
  }
}
