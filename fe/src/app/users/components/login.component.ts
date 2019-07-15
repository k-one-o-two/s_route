import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  authCode: string;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public login() {
    this.authService.login();
  }

  public logoff() {
  }

  public ngOnInit() {
    this.authCode = this.activatedRoute.snapshot.queryParams['code'];
    console.info(this.authCode);
    if (this.authCode) {
      this.authService.setAuthCode(this.authCode)
        .subscribe(() => {
          console.info('gonna redirect');
          this.router.navigate(['/routes']);
        });
    }
  }

}
