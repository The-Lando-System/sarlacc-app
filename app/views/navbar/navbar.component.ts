import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User, Broadcaster } from 'sarlacc-angular-client';

@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: [ 'navbar.component.css' ]
})
export class NavbarComponent {

  user: User;
  welcome: string;

  constructor(
    private userService: UserService,
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
      this.user = user;
      this.welcome = '- Welcome ' + this.user.firstName + '!';
    }).catch(res=>{
      this.user = null;
    });
  }

  isAdmin(): boolean {

    if (this.user != null){
      for (let appRole of this.user.appRoles){
        if (appRole.appName === 'sarlacc' && appRole.role === 'ADMIN'){
          return true;
        }
      }
    }
    
    return false;
  }

  logout(): void {
    this.userService.logout();
    window.location.href = '/';
  }

}