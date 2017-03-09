import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Credentials } from '../login/credentials';
import { Token } from '../login/token';
import { User } from '../login/user';

@Injectable()
export class AccountService {
  private newAccountUrl = 'https://sarlacc.herokuapp.com/account/';

  constructor(
    private http: Http,
    private cookieService: CookieService
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
    let access_token = this.cookieService.get('access-token');
    let headers = new Headers({
      'Authorization'  : 'Bearer ' + access_token
    });
    return headers;
  }

}