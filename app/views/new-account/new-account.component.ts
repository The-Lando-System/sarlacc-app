import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService, User} from 'sarlacc-angular-client';

import { AccountService } from '../../services/account.service'
import { ErrorService } from '../../services/error.service'


@Component({
  moduleId: module.id,
  selector: 'my-new-account',
  templateUrl: 'new-account.component.html',
  styleUrls: [ 'new-account.component.css' ],
  providers: [ AccountService ]
})
export class NewAccountComponent implements OnInit {
  title = 'Create a New Account!';
  newAccountResponse = '';
  newAccountResponseDetail = '';
  loading = false;
  password1 = '';
  password2 = '';

  currentUser: User;

  @Input()
  newUser: User;

  constructor (
    private userService: UserService,
    private newAccountService: AccountService,
    private errorService: ErrorService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.newUser = new User();
    this.password1 = '';
    this.password2 = '';
    this.getLoggedInUser();
  }

  getLoggedInUser():void {
    this.userService.returnUser()
    .then(user => {
      this.currentUser = user;
    })
    .catch(err => {
      window.location.href = '/';
    });
  }

  createNewAccount(): void {
    
    this.clearStatus();

    if ((this.password1 || this.password2) && (this.password1 !== this.password2)){
      this.newAccountResponse = 'Error...';
      this.newAccountResponseDetail = 'Passwords do not match!';
      return;
    } else {
      this.newUser.password = this.password1;
    }

    this.loading = true;

    this.newAccountService.createNewAccount(this.newUser)
    .then(res => {
        console.log(res);
        this.newAccountResponse = 'Success!';
        this.newAccountResponseDetail = null;
        this.loading = false;
        this.newUser = new User();
        this.password1 = '';
        this.password2 = '';
    }).catch(res => {
        this.newAccountResponse = 'Error...';
        var error = this.errorService.handleError(res);
        this.newAccountResponseDetail = error.status + ': ' + error.errorMessage;
        this.loading = false;
    });
  }

  clearStatus(): void {
    this.newAccountResponse = null;
    this.newAccountResponseDetail = null;
    this.loading = false;
  }


}