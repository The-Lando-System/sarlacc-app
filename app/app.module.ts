import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent }  from './app.component';
import { NewAccountComponent } from './admin/new-account.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './admin/user-details.component';

import { UserService } from './sarlacc-client/user.service';
import { Broadcaster } from './sarlacc-client/broadcaster';

import { ErrorService } from './error/error.service';

import { Globals } from './globals';

@NgModule({
  imports: [ 
  	BrowserModule,
  	FormsModule,
  	HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'token/:token',
        component: HomeComponent
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
    HomeComponent,
    UserDetailsComponent,
    LoginComponent
  ],
  providers: [
    CookieService,
    ErrorService,
    UserService,
    Broadcaster,
    Globals
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }