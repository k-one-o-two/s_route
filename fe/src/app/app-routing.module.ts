import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteListComponent } from './route/components/list/route-list.component';
import { LoginComponent } from './users/components/login.component';
import { LoginGuard } from './users/guards/login.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'get-code', component: LoginComponent },
  { path: 'routes', component: RouteListComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
