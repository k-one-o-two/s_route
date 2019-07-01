import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteComponent } from './components/route-component';
import { RouteListComponent } from './components/route-list.component';

@NgModule({
  declarations: [
    RouteComponent,
    RouteListComponent,
  ],
  imports: [
    CommonModule,
    RouteComponent,
    RouteListComponent,
  ],
  exports: [
    RouteListComponent,
  ]
})
export class RouteModule { }
