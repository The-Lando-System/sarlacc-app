import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a routerLink="/home" routerLinkActive="active">Home</a>
      <a routerLink="/new-account" routerLinkActive="active">Create Account</a>
      <a routerLink="/admin" routerLinkActive="active">Administration</a>
      <a routerLink="/login" routerLinkActive="active">Login</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: [ 'app.component.css' ]
})
export class AppComponent {
  title = 'Sarlacc';
}