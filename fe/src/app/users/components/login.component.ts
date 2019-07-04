import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  authCode: string;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  public login() {
    this.authService.login();
  }

  public logoff() {
  }

  public ngOnInit() {
    this.authCode = this.activatedRoute.snapshot.queryParams['code'];
  }

}
