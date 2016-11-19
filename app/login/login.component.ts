import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

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
  loginLoading = false;
  testLoading = false;
  redirectUri = '';

  constructor(
    private loginService: LoginService,
    private testAccessService: TestAccessService,
    private errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.creds = new Credentials();
    this.route.queryParams.forEach((params: Params) => {
      this.redirectUri = params['redirectUri'];
    })
  }

  login(): void {
    this.loginLoading = true;
    this.loginService.login(this.creds)
      .then(res => {
        console.log(res);
        this.token = res;
        this.loginResponse = 'Success! Your token is saved as access-token in your cookies';
        this.loginResponseDetail = null;
        this.loginLoading = false;
        this.creds = new Credentials();
        if (this.redirectUri){
          //this.router.navigate([this.redirectUri]);
          window.location.href = this.redirectUri + '?access_token=' + this.token.access_token;
        }
      }).catch(res => {
        this.loginResponse = 'Error...';

        var error = this.errorService.handleError(res);
        this.loginResponseDetail = error.status + ': ' + error.errorMessage;
        this.loginLoading = false;
      });
  } 

  makeTestCall(): void {
    this.testLoading = true;
    this.testAccessService.makeTestAccessCall()
      .then(res => {
        this.user = res;
        console.log(res);
        this.testAccessResponse = 'Success!';
        this.testAccessResponseDetail = null;
        this.testLoading = false;
      }).catch(res=>{
        this.testAccessResponse = 'Error...';
        this.user = null;

        var error = this.errorService.handleError(res);
        this.testAccessResponseDetail = error.status + ': ' + error.errorMessage;
        this.testLoading = false;
      });
  }

}