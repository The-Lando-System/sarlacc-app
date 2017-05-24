import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UserService, User, Token, Broadcaster } from 'sarlacc-angular-client';

import { AccountService } from '../../services/account.service';

import { ErrorService } from '../../services/error.service';
import { Error } from '../../services/error';

@Component({
  moduleId: module.id,
  selector: 'user-details',
  templateUrl: 'user-details.component.html',
  styleUrls: [ 'user-details.component.css' ],
  providers: [ AccountService ]
})
export class UserDetailsComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  token: Token;

  showRoles = false;

  title = 'User Details';
  loading = false;
  redirectUri = '';
  updatedUser: User = null;
  password1 = '';
  password2 = '';
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
    this.updatedUser = null;
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

  beginEditAccount(): void {
    event.preventDefault();
    this.updatedUser = Object.assign({},this.user);
  }

  stopEditAccount(): void {
    event.preventDefault();
    this.updatedUser = null;
    this.message = '';
  }

  listenForLogin(): void {
   this.broadcaster.on<string>(this.userService.LOGIN_BCAST)
    .subscribe(message => {
      this.getUserDetails();
    });
  }

  editAccount(): void {

    if (this.password1 !== this.password2) {
      this.message = 'Error: passwords do not match!';
      return;
    }

    this.message = '';

    this.loading = true;
    this.updatedUser.password = this.password1;
    this.accountService.editMyAccount(this.updatedUser)
    .then(user => {
      window.location.href = '/';
    }).catch( error => {
      this.message = 'Failed to update user!';
      this.loading = false;
    });
  }

}