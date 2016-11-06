import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AccountService } from '../new-account/account.service';
import { ErrorService } from '../error/error.service';
import { User } from '../login/user';

@Component({
  moduleId: module.id,
  selector: 'user-details',
  templateUrl: 'user-details.component.html',
  styleUrls: [ 'user-details.component.css' ],
  providers: [ AccountService ]
})
export class UserDetailsComponent implements OnInit {

  response = '';
  responseDetail = '';
  loading = false;

  constructor (
    private accountService: AccountService,
    private errorService: ErrorService,
    private router: Router
  ){}

  @Input()
  selectedUser: User;

  @Input()
  users: User[];

  ngOnInit(): void {
    this.clearStatus();
  }

  ngOnChanges(changes: any) {
    this.clearStatus();
  }

  editAccount(): void {
    console.log('Editing user inside user-details component');
    console.log(this.selectedUser);
    this.clearStatus();
    this.loading = true;
    this.accountService.editAccount(this.selectedUser)
    .then(res => {
        console.log(res);
        this.response = 'Success!';
        this.responseDetail = null;
        this.loading = false;
        this.updateUserList();
    }).catch(res => {
        this.response = 'Error...';
        var error = this.errorService.handleError(res);
        this.responseDetail = error.status + ': ' + error.errorMessage;
        this.loading = false;
    });
  }

  deleteUser(): void {
    let wantToDelete = confirm('Are you sure you want to delete this user?');
    if (wantToDelete) {
      this.accountService.deleteAccount(this.selectedUser)
      .then(res => {
          console.log(res);
          this.response = 'Success!';
          this.responseDetail = null;
          this.loading = false;
          this.deleteUserFromList(this.selectedUser.id);
          let link = ['/admin'];
          this.router.navigate(link);
      }).catch(res => {
          this.response = 'Error...';
          var error = this.errorService.handleError(res);
          this.responseDetail = error.status + ': ' + error.errorMessage;
          this.loading = false;
      });
    }
  }

  deleteUserFromList(id: String): void {
    for(var i=0; i<this.users.length; i++){
      if (this.users[i].id === id){
        this.users = this.users.splice(i,1);
      }
    }
  }

  updateUserList(): void {
    for(var i=0; i<this.users.length; i++){
      if (this.users[i].id === this.selectedUser.id){
        this.users[i] = this.selectedUser;
      }
    }
  }

  clearStatus(): void {
    this.response = '';
    this.responseDetail = '';
    this.loading = false;
  }

}