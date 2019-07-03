import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteListComponent } from './route/components/route-list.component';

const routes: Routes = [
  {path: '', component: RouteListComponent},
  // {path: 'route/:id', component: }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
