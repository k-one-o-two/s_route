import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login.component';
import { AuthService } from './services/auth.service';
import { LoginGuard } from './guards/login.guard';

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
  providers: [AuthService, LoginGuard]
})
export class UsersModule { }
