import { Component, Input, OnInit } from '@angular/core';

import { Credentials } from './credentials';
import { LoginService } from './login.service';
import { TestAccessService } from './test-access.service';
import { Token } from './token';
import { User } from './user';

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
    private testAccessService: TestAccessService
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
        this.loginResponseDetail = JSON.parse(res._body).error_description;
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
        console.log(res);
        this.testAccessResponse = 'Error...';
        this.testAccessResponseDetail = JSON.parse(res._body).error_description;
        this.user = null;
      });
  }

}