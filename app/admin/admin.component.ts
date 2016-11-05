import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../new-account/account.service';
import { ErrorService } from '../error/error.service';
import { User } from '../login/user';

@Component({
  moduleId: module.id,
  selector: 'my-admin',
  templateUrl: 'admin.component.html',
  styleUrls: [ 'admin.component.css' ],
  providers: [ AccountService ]
})
export class AdminComponent implements OnInit {
  title = 'Account Administration';
  accountResponse = '';
  accountResponseDetail = '';
  loading = false;

  @Input()
  users: User[];

  @Input()
  selectedUser: User;

  constructor (
    private accountService: AccountService,
    private errorService: ErrorService
  ){}


  ngOnInit(): void {
    this.selectedUser = null;
    this.getUsers();
  }

  editAccount(userToEdit: User): void {
    this.clearStatus();
    this.loading = true;
    this.accountService.editAccount(userToEdit)
    .then(res => {
        console.log(res);
        this.accountResponse = 'Success!';
        this.accountResponseDetail = null;
        this.loading = false;
    }).catch(res => {
        this.accountResponse = 'Error...';
        var error = this.errorService.handleError(res);
        this.accountResponseDetail = error.status + ': ' + error.errorMessage;
        this.loading = false;
    });
  }

  selectUser(selectedUser: User): void {
    this.selectedUser = selectedUser;
  }

  getUsers(): void {
    this.loading = true;
    this.accountService.getUsers()
    .then(res => {
        console.log(res);
        this.users = res;
        this.loading = false;
    }).catch(res => {
        this.accountResponse = 'Error...';
        var error = this.errorService.handleError(res);
        this.accountResponseDetail = error.status + ': ' + error.errorMessage;
        this.loading = false;
    });
  }

  deleteUser(selectedUser: User): void {
    let wantToDelete = confirm('Are you sure you want to delete this user?');
    if (wantToDelete) {
      // Delete the selected user
    }
  }

  clearStatus(): void {
    this.accountResponse = null;
    this.accountResponseDetail = null;
    this.loading = false;
  }

}