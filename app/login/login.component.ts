import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { Credentials } from '../login/credentials';
import { LoginService } from '../login/login.service';
import { Token } from '../login/token';
import { User } from '../login/user';

import { ErrorService } from '../error/error.service';
import { Error } from '../error/error';

@Component({
  moduleId: module.id,
  selector: 'my-login',
  templateUrl: 'login.component.html',
  styleUrls: [ 'login.component.css' ],
  providers: [
    LoginService
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
  loginLoading = false;

  constructor(
    private loginService: LoginService,
    private errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.creds = new Credentials();
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
        let link = [''];
        this.router.navigate(link);
      }).catch(res => {
        this.loginResponse = 'Error...';
        var error = this.errorService.handleError(res);
        this.loginResponseDetail = error.status + ': ' + error.errorMessage;
        this.loginLoading = false;
      });
  } 

}