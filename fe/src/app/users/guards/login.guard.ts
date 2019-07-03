import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate() {
    return !this.authService.isLogged();
  }
}
