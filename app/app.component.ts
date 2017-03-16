import { Component, Input } from '@angular/core';

import { User } from './login/user';
import { TestAccessService } from './login/test-access.service';
import { ErrorService } from './error/error.service';
import { Broadcaster } from './broadcaster/broadcaster';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.css' ],
  providers: [
    TestAccessService,
    Broadcaster
  ]
})
export class AppComponent {

  @Input()
  currentUser: User;

  welcome = '';

  constructor(
    private testAccessService: TestAccessService,
    private errorService: ErrorService,
    private broadcaster: Broadcaster
  ){}

  ngOnInit(): void {
    this.broadcaster.on<string>('Login')
    .subscribe(message => {
      this.userLoggedIn(message);
    });
    this.testAccessService.makeTestAccessCall()
      .then(res => {
        this.currentUser = res;
        this.welcome = '- Welcome ' + this.currentUser.firstName + '!';
      }).catch(res=>{
        this.currentUser = null;
        var error = this.errorService.handleError(res);
      });
  }

  userLoggedIn(message: String): void {
    console.log(message);
    this.ngOnInit();
  }

  isAdmin(): boolean {
    if (this.currentUser != null && this.currentUser.role == 'ADMIN') {
      return true;
    } else {
      return false;
    }
  }


}