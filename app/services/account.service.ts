import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UserService, User } from 'sarlacc-angular-client';

import { Globals } from '../globals';

@Injectable()
export class AccountService {
  private newAccountUrl = this.globals.svc_domain + '/account/';

  constructor(
    private globals: Globals,
    private http: Http,
    private userSvc: UserService
  ){}

  createNewAccount(newUser: User): Promise<any> {
    return this.http.post(this.newAccountUrl, newUser, {headers: this.userSvc.getUserAuthHeaders()})
      .toPromise();
  }

  editAccount(userToEdit: User): Promise<any> {
    return this.http.put(this.newAccountUrl, userToEdit, {headers: this.userSvc.getUserAuthHeaders()})
      .toPromise();
  }

  editMyAccount(userToEdit: User): Promise<any> {
    return this.http.put(this.newAccountUrl + '/me/', userToEdit, {headers: this.userSvc.getUserAuthHeaders()})
      .toPromise();
  }

  deleteAccount(userToDelete: User): Promise<any> {
    return this.http.delete(this.newAccountUrl + userToDelete.id, {headers: this.userSvc.getUserAuthHeaders()})
      .toPromise();
  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.newAccountUrl, {headers: this.userSvc.getUserAuthHeaders()})
      .toPromise()
      .then(res => res.json());
  }

  getUserById(id: String): Promise<User> {
    return this.http.get(this.newAccountUrl + id, {headers: this.userSvc.getUserAuthHeaders()})
      .toPromise()
      .then(res => res.json());
  }

}