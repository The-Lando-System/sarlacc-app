import { Component, Input, OnInit } from '@angular/core';

import { Credentials } from './credentials';
import { LoginService } from './login.service';

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

  title = 'Login';
  loginResponse = '';

  constructor(
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    this.creds = new Credentials();
  }

  login(): void {
    this.loginService.login(this.creds)
      .then(res => console.log(res));
    //this.loginResponse = `Login Attempted: ${this.creds.username}, ${this.creds.password}`;
  } 

}