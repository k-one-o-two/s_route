import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { ClrWizardModule, ClrFormsModule } from '@clr/angular'

import { RouteComponent } from './components/route/route-component';
import { RouteListComponent } from './components/list/route-list.component';
import { CreateComponent } from './components/create/create.component';

import { RoutesService } from './services/route-service';

@NgModule({
  declarations: [
    RouteComponent,
    RouteListComponent,
    CreateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClrWizardModule,
    ClrFormsModule
  ],
  exports: [
    RouteListComponent,
    CreateComponent
  ],
  providers: [RoutesService]
})
export class RouteModule { }
