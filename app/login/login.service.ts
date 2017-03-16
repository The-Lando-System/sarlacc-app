import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { Credentials } from './credentials';
import { Token } from './token';
import { Broadcaster } from '../broadcaster/broadcaster';

@Injectable()
export class LoginService {
  private loginUrl = 'https://sarlacc.herokuapp.com/oauth/token';
  private fileReader: FileReader;
  private headers = new Headers({
    'Content-Type'   : 'application/x-www-form-urlencoded',
    'Authorization'  : 'Basic ' + btoa('sarlacc:deywannawanga')
  });
  constructor(
    private http: Http,
    private cookieService: CookieService,
    private broadcaster: Broadcaster
  ){}


  login(creds: Credentials): Promise<Token> {
    creds.grant_type = 'password';
    let body = `username=${creds.username}&password=${creds.password}&grant_type=${creds.grant_type}`;
    return this.http.post(this.loginUrl, body, {headers: this.headers})
      .toPromise()
      .then(res=>{
        var token = res.json();
        this.cookieService.put('access-token',token.access_token);
        this.broadcaster.broadcast('Login','The user logged in');
        return token;
      });
  }

  saveToken(token: string): void {
    this.cookieService.put('access-token',token);
    this.broadcaster.broadcast('Login','The user logged in');
  }

}