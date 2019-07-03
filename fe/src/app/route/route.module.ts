import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { RouteComponent } from './components/route/route-component';
import { RouteListComponent } from './components/list/route-list.component';

import { RoutesService } from './services/route-service';

@NgModule({
  declarations: [
    RouteComponent,
    RouteListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouteListComponent,
  ],
  providers: [RoutesService]
})
export class RouteModule { }
