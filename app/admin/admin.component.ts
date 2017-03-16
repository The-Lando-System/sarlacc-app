import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { AccountService } from '../admin/account.service';
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
    private errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ){}


  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      if (id){
        this.accountService.getUserById(id).then(user => this.selectedUser = user);
      }
    })
    this.getUsers();
  }

  ngOnChanges(changes: any) {
    console.log(changes);
  }

  selectUser(selectedUser: User): void {
    this.selectedUser = selectedUser;
    let link = ['/admin', selectedUser.id];
    this.router.navigate(link);
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

  clearStatus(): void {
    this.accountResponse = null;
    this.accountResponseDetail = null;
    this.loading = false;
  }

}