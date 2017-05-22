import { Component, OnInit, Input } from '@angular/core';
import { User } from 'sarlacc-angular-client';
import { AppRolesService } from '../../services/app-roles.service';
import { AppRole } from '../../services/app-role';
import { App } from '../../services/app';

@Component({
  moduleId: module.id,
  selector: 'roles',
  templateUrl: 'roles.component.html',
  styleUrls: [ 'roles.component.css' ],
  providers: [ AppRolesService ]
})
export class RolesComponent implements OnInit {

  @Input()
  user:User;

  apps: App[] = [];
  appRoles: AppRole[] = [];

  newAppRole: AppRole = new AppRole();

  constructor (
      private appRolesSvc: AppRolesService
  ){}

  ngOnInit(): void {
    this.getUserAppRoles();
  }

  ngOnChanges(changes: any) {
    this.getUserAppRoles();
    
  }

  getUserAppRoles(): void {
    this.appRolesSvc.getUserAppRoles(this.user.username)
    .then((appRoles:AppRole[]) => {
        this.appRoles = appRoles;
        this.getApps();
    }).catch((err:any) => {});
  }

  getApps(): void {
    this.appRolesSvc.getApps()
    .then((apps:App[]) => {
      this.apps = apps;
      this.removeAppsFromAppRoles();
    }).catch((err:any) => {});
  }

  addAppRole(): void {
    if (!this.newAppRole.appName || !this.newAppRole.role){
      return;
    }

    this.newAppRole.username = this.user.username;

    this.appRolesSvc.createAppRole(this.newAppRole)
    .then((newAppRole:AppRole) => {
      this.appRoles.push(newAppRole);
      this.removeAppsFromAppRoles();
    }).catch((err:any) => {});
  }

  removeAppRole(appRoleToRemove:AppRole): void {
    event.preventDefault();
    this.appRolesSvc.deleteAppRole(appRoleToRemove)
    .then((res:any) => {
      let app:App = new App();
      app.name = appRoleToRemove.appName;
      this.apps.push(app);
      this.removeAppRoleFromAppRoles(appRoleToRemove);
    }).catch((err:any) => {});
  }

  removeAppsFromAppRoles(): void {
    for (var i=0; i<this.appRoles.length; i++){
      for (var j=0; j<this.apps.length; j++){
        if (this.apps[j].name === this.appRoles[i].appName){
          this.apps.splice(j,1);
          break;
        }
      }
    }
  }

  removeAppRoleFromAppRoles(appRole:AppRole): void {
    for (var i=0; i<this.appRoles.length; i++){
      if (this.appRoles[i].appName === appRole.appName){
        this.appRoles.splice(i,1);
      }
    }
  }

}