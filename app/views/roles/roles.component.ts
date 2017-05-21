import { Component, OnInit, Input } from '@angular/core';
import { User } from 'sarlacc-angular-client';
import { AppRolesService } from '../../services/app-roles.service';
import { AppRole } from '../../services/app-role';

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

  appRoles: AppRole[] = [];

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
    }).catch((err:any) => {});
  }

}