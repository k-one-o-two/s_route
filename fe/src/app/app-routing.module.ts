import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteListComponent } from './route/components/list/route-list.component';
import { RouteViewComponent } from './route/components/route-view/route-view.component';
import { LoginComponent } from './users/components/login.component';

import { LoginGuard } from './users/guards/login.guard';
import { AuthGuard } from './users/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'get-code', component: LoginComponent },
  { path: 'routes', component: RouteListComponent, canActivate: [AuthGuard] },
  { path: 'route/:id', component: RouteViewComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/routes', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
