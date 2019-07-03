import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { RouteListComponent } from './route/components/route-list.component';
import { RouteModule } from './route/route.module';


@NgModule({
  declarations: [
    AppComponent,
    // RouteListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
