import { Component, Input, OnInit } from '@angular/core';

import { Credentials } from './credentials';
import { LoginService } from './login.service';
import { Token } from './token';
import { User } from './user';

import { ErrorService } from '../error/error.service';
import { Error } from '../error/error';

@Component({
  moduleId: module.id,
  selector: 'oauth-login',
  templateUrl: 'oauth-login.component.html',
  styleUrls: [ 'oauth-login.component.css' ],
  providers: [
    LoginService
  ]
})
export class OauthLoginComponent implements OnInit {

  @Input()
  creds: Credentials;

  @Input()
  user: User;

  @Input()
  token: Token;

  title = 'OAuth2 Login';
  loginResponse = '';
  loginResponseDetail = '';
  testAccessResponse = '';
  testAccessResponseDetail = '';

  constructor(
    private loginService: LoginService,
    private errorService: ErrorService
  ){}


  // URL params:
  // ?client_id=acme&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Flogin%2Fsarlacc&response_type=code&state=asF4wj


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

}