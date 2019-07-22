import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../users/services/user-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public currentUser = {};
  @Output() createRoute = new EventEmitter();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser()
      .subscribe(user => {
        console.info(this.currentUser);
        this.currentUser = user;
      });
  }

  emitCreateEvt() {
    console.info('emitCreateEvt');
    this.createRoute.emit({ create: true });
  }
}
