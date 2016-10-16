import { Component, Input, OnInit } from '@angular/core';

import { Credentials } from './credentials';
import { LoginService } from './login.service';
import { TestAccessService } from './test-access.service';
import { Token } from './token';
import { User } from './user';

import { ErrorService } from '../error/error.service';
import { Error } from '../error/error';

@Component({
  moduleId: module.id,
  selector: 'my-login',
  templateUrl: 'login.component.html',
  styleUrls: [ 'login.component.css' ],
  providers: [
    LoginService,
    TestAccessService
  ]
})
export class LoginComponent implements OnInit {

  @Input()
  creds: Credentials;

  @Input()
  user: User;

  @Input()
  token: Token;

  title = 'Login';
  loginResponse = '';
  loginResponseDetail = '';
  testAccessResponse = '';
  testAccessResponseDetail = '';

  constructor(
    private loginService: LoginService,
    private testAccessService: TestAccessService,
    private errorService: ErrorService
  ){}

  ngOnInit(): void {
    this.creds = new Credentials();
  }

  login(): void {
    this.loginService.login(this.creds)
      .then(res => {
        console.log(res);
        this.loginResponse = 'Success! Your token is saved as access-token in your cookies';
        this.loginResponseDetail = null;
      }).catch(res => {
        this.loginResponse = 'Error...';

        var error = this.errorService.handleError(res);
        this.loginResponseDetail = error.status + ': ' + error.errorMessage;
      });
  } 

  makeTestCall(): void {
    this.testAccessService.makeTestAccessCall()
      .then(res => {
        this.user = res;
        console.log(res);
        this.testAccessResponse = 'Success!';
        this.testAccessResponseDetail = null;
      }).catch(res=>{
        this.testAccessResponse = 'Error...';
        this.user = null;

        var error = this.errorService.handleError(res);
        this.testAccessResponseDetail = error.status + ': ' + error.errorMessage;
      });
  }

}