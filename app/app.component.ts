import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User, Broadcaster } from 'sarlacc-angular-client';

import { ErrorService } from './error/error.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ]
})
export class AppComponent {

  @Input()
  currentUser: User;

  welcome = '';

  constructor(
    private userService: UserService,
    private errorService: ErrorService,
    private broadcaster: Broadcaster,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getUser();
    this.listenForLogin();
  }

  listenForLogin(): void {
    this.broadcaster.on<string>(this.userService.LOGIN_BCAST)
    .subscribe(message => {
      this.getUser();
    });
  }

  getUser(): void {
    this.userService.returnUser()
    .then(user => {
      this.currentUser = user;
      this.welcome = '- Welcome ' + this.currentUser.firstName + '!';
    }).catch(res=>{
      this.currentUser = null;
      var error = this.errorService.handleError(res);
    });
  }

  isAdmin(): boolean {
    if (this.currentUser != null && this.currentUser.role == 'ADMIN') {
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    this.userService.logout();
    window.location.href = '/';
  }

}