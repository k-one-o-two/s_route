import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm = new FormGroup({
    userName: new FormControl(''),
    userPass: new FormControl('')
  });

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.loginForm.value);
  }
}
