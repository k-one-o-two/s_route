import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user-service';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginComponent,
  ],
  providers: [AuthService, LoginGuard, AuthGuard, UserService]
})
export class UsersModule { }
