import { Component, OnInit } from '@angular/core';
import { UserService } from '../../users/services/user-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public currentUser = {};

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.info('>>>>');

    this.userService.getCurrentUser()
      .subscribe(user => {
        console.info({ user });
        this.currentUser = user
      });
  }
}
