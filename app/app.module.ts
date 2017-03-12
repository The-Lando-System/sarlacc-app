import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent }  from './app.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './admin/user-details.component';

import { ErrorService } from './error/error.service';

@NgModule({
  imports: [ 
  	BrowserModule,
  	FormsModule,
  	HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'token/:token',
        component: LoginComponent
      },
      {
        path: 'new-account',
        component: NewAccountComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'admin/:id',
        component: AdminComponent
      }
    ])
  ],
  declarations: [ 
  	AppComponent,
    NewAccountComponent,
    AdminComponent,
    LoginComponent,
    UserDetailsComponent
  ],
  providers: [
    CookieService,
    ErrorService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }