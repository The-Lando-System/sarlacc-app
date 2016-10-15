import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Credentials } from './credentials';

@Injectable()
export class LoginService {
  private loginUrl = 'http://localhost:8080/authenticate';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http
  ){}


  login(creds: Credentials): Promise<void> {
    let url = `${this.loginUrl}?username=${creds.username}&password=${creds.password}`;
    return this.http.post(url, creds, {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ', error);
    return Promise.reject(error.message || error);
  }

}