import { Component, Input, OnInit } from '@angular/core';

import { Credentials } from './credentials';
import { LoginService } from './login.service';
import { TestAccessService } from './test-access.service';
import { Token } from './token';

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

  title = 'Login';
  loginResponse = '';
  testResponse = '';

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
        this.loginResponse = JSON.stringify(res);
      });
  } 

  makeTestCall(): void {
    this.testAccessService.makeTestAccessCall()
      .then(res => {
        console.log(res);
        this.testResponse = JSON.stringify(res);
      });
  }

}