import { Component, Input, OnInit } from '@angular/core';

import { User } from '../login/user'
import { NewAccountService } from './account.service'
import { ErrorService } from '../error/error.service'

@Component({
  moduleId: module.id,
  selector: 'my-new-account',
  templateUrl: 'new-account.component.html',
  styleUrls: [ 'new-account.component.css' ],
  providers: [ NewAccountService ]
})
export class NewAccountComponent implements OnInit {
  title = 'Create a New Account!';
  newAccountResponse = '';
  newAccountResponseDetail = '';
  loading = false;

  @Input()
  newUser: User;

  constructor (
    private newAccountService: NewAccountService,
    private errorService: ErrorService
  ){}

  ngOnInit(): void {
    this.newUser = new User();
  }

  createNewAccount(): void {
    this.clearStatus();
    this.loading = true;
    this.newAccountService.createNewAccount(this.newUser)
    .then(res => {
        console.log(res);
        this.newAccountResponse = 'Success!';
        this.newAccountResponseDetail = null;
        this.loading = false;
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