import { Component, OnInit, Input } from '@angular/core';
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

  constructor (
    private accountService: AccountService,
    private errorService: ErrorService
  ){}

  @Input()
  selectedUser: User;

  ngOnInit(): void {
  }

  editAccount(): void {
    console.log('Editing user inside user-details component');
    console.log(this.selectedUser);
    // this.clearStatus();
    // this.loading = true;
    // this.accountService.editAccount(userToEdit)
    // .then(res => {
    //     console.log(res);
    //     this.accountResponse = 'Success!';
    //     this.accountResponseDetail = null;
    //     this.loading = false;
    // }).catch(res => {
    //     this.accountResponse = 'Error...';
    //     var error = this.errorService.handleError(res);
    //     this.accountResponseDetail = error.status + ': ' + error.errorMessage;
    //     this.loading = false;
    // });
  }

  deleteUser(): void {
    let wantToDelete = confirm('Are you sure you want to delete this user?');
    if (wantToDelete) {
      // Delete the selected user
    }
  }

}