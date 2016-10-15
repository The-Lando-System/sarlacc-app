import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestService {
  private testUrl = 'http://localhost:8080/note';
  private fileReader: FileReader;
  private headers = new Headers({
    'Authorization'  : 'Bearer 2f95ae5d-ec7b-47ae-a904-b8ebf46ca58a'//btoa('acme:acmesecret')
  });

  constructor(
    private http: Http
  ){}


  makeTestCall(): Promise<void> {
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