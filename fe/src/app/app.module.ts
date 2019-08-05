import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppState } from './common/app.state';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './users/state/user.reducer';
import { UserEffects } from './users/state/user.effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouteModule } from './route/route.module';
import { UsersModule } from './users/users.module';
import { CommonComponentsModule } from './common/common.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(
      {
        user: userReducer
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot([UserEffects]),
    AppRoutingModule,
    HttpClientModule,
    RouteModule,
    UsersModule,
    ClarityModule,
    BrowserAnimationsModule,
    CommonComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
