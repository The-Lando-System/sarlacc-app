import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { Broadcaster } from '../broadcaster/broadcaster';

import { Credentials } from '../login/credentials';
import { LoginService } from '../login/login.service';
import { TestAccessService } from '../login/test-access.service';
import { Token } from '../login/token';
import { User } from '../login/user';

import { ErrorService } from '../error/error.service';
import { Error } from '../error/error';

@Component({
  moduleId: module.id,
  selector: 'my-home',
  templateUrl: 'home.component.html',
  styleUrls: [ 'home.component.css' ],
  providers: [
    LoginService,
    TestAccessService
  ]
})
export class HomeComponent implements OnInit {

  @Input()
  creds: Credentials;

  @Input()
  user: User;

  @Input()
  token: Token;

  title = 'User Details';
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
    private route: ActivatedRoute,
    private broadcaster: Broadcaster
  ){}

  ngOnInit(): void {
    this.creds = new Credentials();
    this.route.queryParams.forEach((params: Params) => {
      this.redirectUri = params['redirectUri'];
    })
    this.route.params.forEach((params: Params) => {
      let token = params['token'];
      if (token){
        this.loginService.saveToken(token);
      }
    })
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.testLoading = true;
    this.testAccessService.makeTestAccessCall()
      .then(res => {
        this.user = res;
        console.log(res);
        this.testLoading = false;
      }).catch(res=>{
        this.user = null;
        var error = this.errorService.handleError(res);
        this.testLoading = false;
        let link = ['/login'];
        this.router.navigate(link);
      });
  }

  listenForLogin(): void {
   this.broadcaster.on<string>("Login")
    .subscribe(message => {
      this.getUserDetails();
    });
  }

}