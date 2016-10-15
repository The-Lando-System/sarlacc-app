import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class TestAccessService {
  private testUrl = 'http://localhost:8080/user-details';
  private fileReader: FileReader;
  private headers: Headers;

  constructor(
    private http: Http,
    private cookieService: CookieService
  ){}


  makeTestAccessCall(): Promise<void> {
    let access_token = this.cookieService.get('access-token');
    this.headers = new Headers({
      'Authorization'  : 'Bearer ' + access_token
    });
    //let body = `username=${creds.username}&password=${creds.password}&grant_type=${creds.grant_type}`;
    return this.http.get(this.testUrl, {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ', error);
    return Promise.reject(error.message || error);
  }

}