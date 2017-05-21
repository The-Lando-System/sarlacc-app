import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { UserService, User } from 'sarlacc-angular-client';

import { AccountService } from '../../services/account.service';
import { ErrorService } from '../../services/error.service';

@Component({
  moduleId: module.id,
  selector: 'my-admin',
  templateUrl: 'admin.component.html',
  styleUrls: [ 'admin.component.css' ],
  providers: [ AccountService ]
})
export class AdminComponent implements OnInit {
  title = 'Account Administration';
  loading = false;

  currentUser: User;

  @Input()
  users: User[];

  @Input()
  selectedUser: User;

  constructor (
    private userService: UserService,
    private accountService: AccountService,
    private errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ){}


  ngOnInit(): void {
    this.getLoggedInUser();
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      if (id){
        this.accountService.getUserById(id).then(user => this.selectedUser = user);
      }
    })
    this.getUsers();
  }

  getLoggedInUser():void {
    this.userService.returnUser()
    .then(user => {
      this.currentUser = user;
      if (user.role !== 'ADMIN'){
        window.location.href = '/';
      }
    })
    .catch(err => {
      window.location.href = '/';
    });
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
        this.users = res;
        this.loading = false;
    }).catch(res => {
        this.loading = false;
    });
  }

  clearStatus(): void {
    this.loading = false;
  }

}