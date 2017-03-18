import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

import { Broadcaster } from '../sarlacc-client/broadcaster';

import { UserService } from '../sarlacc-client/user.service';
import { Token } from '../sarlacc-client/token';
import { User } from '../sarlacc-client/user';

import { ErrorService } from '../error/error.service';
import { Error } from '../error/error';

@Component({
  moduleId: module.id,
  selector: 'my-home',
  templateUrl: 'home.component.html',
  styleUrls: [ 'home.component.css' ]
})
export class HomeComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  token: Token;

  title = 'User Details';
  loading = false;
  redirectUri = '';

  constructor(
    private userService: UserService,
    private errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute,
    private broadcaster: Broadcaster
  ){}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let accessToken = params['token'];
      if (accessToken){
        let token = new Token();
        token.access_token = accessToken;
        this.userService.putTokenInCookie(token);
        window.location.href = '/';
      }
    })
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