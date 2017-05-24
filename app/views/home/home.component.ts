import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UserService, User, Token, Broadcaster } from 'sarlacc-angular-client';

import { AccountService } from '../../services/account.service';

import { ErrorService } from '../../services/error.service';
import { Error } from '../../services/error';

@Component({
  moduleId: module.id,
  selector: 'my-home',
  templateUrl: 'home.component.html',
  styleUrls: [ 'home.component.css' ],
  providers: [
    AccountService
  ]
})
export class HomeComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  token: Token;

  title = 'User Details';
  loading = false;
  redirectUri = '';
  message = '';

  constructor(
    private userService: UserService,
    private accountService: AccountService,
    private errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute,
    private broadcaster: Broadcaster,
    private cookieSvc: CookieService
  ){}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let accessToken = params['token'];
      if (accessToken){
        let token = new Token();
        token.access_token = accessToken;
        this.cookieSvc.put('access-token',token.access_token);
        window.location.href = '/';
      }
    })
    this.message = '';
    this.getUserDetails();
    this.listenForLogin();
  }

  getUserDetails(): void {
    this.loading = true;
    this.userService.returnUser()
      .then(user => {
        this.user = user;
        this.loading = false;
      }).catch(res=>{
        this.user = null;
        var error = this.errorService.handleError(res);
        this.loading = false;
        let link = ['/login'];
        this.router.navigate(link);
      });
  }

  listenForLogin(): void {
   this.broadcaster.on<string>(this.userService.LOGIN_BCAST)
    .subscribe(message => {
      this.getUserDetails();
    });
  }

}