import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Globals } from '../globals';

import { UserService } from '../sarlacc-client/user.service';
import { User } from '../sarlacc-client/user';

@Injectable()
export class AccountService {
  private newAccountUrl = this.globals.svc_domain + '/account/';

  constructor(
    private globals: Globals,
    private http: Http,
    private userSevrice: UserService
  ){}

  createNewAccount(newUser: User): Promise<any> {
    newUser.role = 'USER';
    return this.http.post(this.newAccountUrl, newUser, {headers: this.getHeaders()})
      .toPromise();
  }

  editAccount(userToEdit: User): Promise<any> {
    return this.http.put(this.newAccountUrl, userToEdit, {headers: this.getHeaders()})
      .toPromise();
  }

  editMyAccount(userToEdit: User): Promise<any> {
    return this.http.put(this.newAccountUrl + '/me/', userToEdit, {headers: this.getHeaders()})
      .toPromise();
  }

  deleteAccount(userToDelete: User): Promise<any> {
    return this.http.delete(this.newAccountUrl + userToDelete.id, {headers: this.getHeaders()})
      .toPromise();
  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.newAccountUrl, {headers: this.getHeaders()})
      .toPromise()
      .then(res => res.json());
  }

  getUserById(id: String): Promise<User> {
    return this.http.get(this.newAccountUrl + id, {headers: this.getHeaders()})
      .toPromise()
      .then(res => res.json());
  }

  getHeaders(): Headers {
    let access_token = this.userSevrice.getToken().access_token;
    let headers = new Headers({
      'Authorization'  : 'Bearer ' + access_token
    });
    return headers;
  }

}