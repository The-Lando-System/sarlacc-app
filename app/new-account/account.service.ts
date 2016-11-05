import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Credentials } from '../login/credentials';
import { Token } from '../login/token';
import { User } from '../login/user';

@Injectable()
export class NewAccountService {
  private newAccountUrl = 'http://localhost:8080/account/';
  private headers = new Headers({
    //'Content-Type'   : 'application/x-www-form-urlencoded',
    'Authorization'  : 'Basic ' + btoa('acme:acmesecret')
  });

  constructor(
    private http: Http,
    private cookieService: CookieService
  ){}

  createNewAccount(newUser: User): Promise<any> {
    let access_token = this.cookieService.get('access-token');
    this.headers = new Headers({
      'Authorization'  : 'Bearer ' + access_token
    });
    return this.http.post(this.newAccountUrl, newUser, {headers: this.headers})
      .toPromise();
  }

}