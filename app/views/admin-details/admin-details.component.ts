import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'sarlacc-angular-client';

import { AccountService } from '../../services/account.service';
import { ErrorService } from '../../services/error.service';

@Component({
  moduleId: module.id,
  selector: 'admin-details',
  templateUrl: 'admin-details.component.html',
  styleUrls: [ 'admin-details.component.css' ],
  providers: [ AccountService ]
})
export class AdminDetailsComponent implements OnInit {

  response = '';
  responseDetail = '';
  loading = false;

  password1 = '';
  password2 = '';

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
    this.password1 = '';
    this.password2 = '';
  }

  ngOnChanges(changes: any) {
    this.clearStatus();
    this.password1 = '';
    this.password2 = '';
  }

  editAccount(): void {
    console.log('Editing user inside user-details component');
    console.log(this.selectedUser);
    this.clearStatus();
    
    if ((this.password1 || this.password2) && (this.password1 !== this.password2)){
      this.response = 'Error...';
      this.responseDetail = 'Passwords do not match!';
      return;
    } else {
      this.selectedUser.password = this.password1;
    }

    console.log(this.selectedUser);

    this.loading = true;
    this.accountService.editAccount(this.selectedUser)
    .then(res => {
        console.log(res);
        this.response = 'Success!';
        this.responseDetail = null;
        this.loading = false;
        this.password1 = '';
        this.password2 = '';
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