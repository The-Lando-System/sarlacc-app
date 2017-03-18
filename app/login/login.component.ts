import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../sarlacc-client/user.service';
import { Token } from '../sarlacc-client/token';
import { User } from '../sarlacc-client/user';

import { ErrorService } from '../error/error.service';
import { Error } from '../error/error';

@Component({
  moduleId: module.id,
  selector: 'my-login',
  templateUrl: 'login.component.html',
  styleUrls: [ 'login.component.css' ]
})
export class LoginComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  token: Token;

  title = 'Login';
  loginResponse = '';
  loginResponseDetail = '';
  loginLoading = false;
  creds = {};

  constructor(
    private userService: UserService,
    private errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.creds = {};
  }

  login(): void {
    this.loginLoading = true;
    this.userService.login(this.creds)
      .then(user => {
        console.log(user);
        this.user = user;
        this.loginResponse = 'Login Successful! Welcome to the Sarlacc, ' + user.firstName + '!';
        this.loginResponseDetail = null;
        this.loginLoading = false;
        this.creds = {};
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