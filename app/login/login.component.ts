import { Component, Input, OnInit } from '@angular/core';

import { Credentials } from './credentials';

@Component({
  moduleId: module.id,
  selector: 'my-login',
  templateUrl: 'login.component.html',
  styleUrls: [ 'login.component.css' ]
})
export class LoginComponent implements OnInit {

  @Input()
  creds: Credentials;

  title = 'Login';
  loginResponse = '';

  ngOnInit(): void {
    this.creds = new Credentials();
  }

  login(): void {
    // LoginService
    this.loginResponse = `Login Attempted: ${this.creds.username}, ${this.creds.password}`;
  } 

}