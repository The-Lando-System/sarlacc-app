import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UserService, User } from 'sarlacc-angular-client';

import { AppRole } from './app-role';
import { App } from './app';

import { Globals } from '../globals';

@Injectable()
export class AppRolesService {
  private appRoleUrl = this.globals.svc_domain + '/app-role/';
  private appsUrl = this.globals.svc_domain + '/app/';

  constructor(
    private globals: Globals,
    private http: Http,
    private userSvc: UserService
  ){}

  getApps(): Promise<App[]> {
    return this.http.get(this.appsUrl, {headers: this.userSvc.getUserAuthHeaders()})
      .toPromise()
      .then((res:any) => {
          return res.json();
      }).catch((err:any) => {
          console.warn(err);
      });
  }

  getUserAppRoles(username:string): Promise<AppRole[]> {
    return this.http.get(this.appRoleUrl + username + '/', {headers: this.userSvc.getUserAuthHeaders()})
      .toPromise()
      .then((res:any) => {
          return res.json();
      }).catch((err:any) => {
          console.warn(err);
      });
  }

  createAppRole(newAppRole:AppRole): Promise<AppRole> {
    return this.http.post(this.appRoleUrl, newAppRole, {headers: this.userSvc.getUserAuthHeaders()})
      .toPromise()
      .then((res:any) => {
          return res.json();
      }).catch((err:any) => {
          console.warn(err);
      });
  }

  deleteAppRole(appRoleToRemove:AppRole): Promise<void> {
    return this.http.delete(this.appRoleUrl + appRoleToRemove.username + '/' + appRoleToRemove.appName, {headers: this.userSvc.getUserAuthHeaders()})
      .toPromise()
      .then((res:any) => {
      }).catch((err:any) => {
          console.warn(err);
      });
  }

}