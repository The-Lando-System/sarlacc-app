import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Credentials } from './credentials';

@Injectable()
export class LoginService {
  private loginUrl = 'http://localhost:8080/oauth/token';
  private fileReader: FileReader;
  private headers = new Headers({
    'Content-Type'   : 'application/x-www-form-urlencoded',
    'Authorization'  : 'Basic ' + btoa('acme:acmesecret')
  });

  constructor(
    private http: Http
  ){}


  login(creds: Credentials): Promise<void> {
    creds.grant_type = 'password';
    let body = `username=${creds.username}&password=${creds.password}&grant_type=${creds.grant_type}`;
    return this.http.post(this.loginUrl, body, {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ', error);
    return Promise.reject(error.message || error);
  }

}