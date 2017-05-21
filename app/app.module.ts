import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent }  from './app.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { NewAccountComponent } from './views/new-account/new-account.component';
import { AdminComponent } from './views/admin/admin.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { UserDetailsComponent } from './views/user-details/user-details.component';
import { AdminDetailsComponent } from './views/admin-details/admin-details.component';

import { UserService, Broadcaster } from 'sarlacc-angular-client';

import { ErrorService } from './services/error.service';

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
    LoginComponent,
    NavbarComponent,
    AdminDetailsComponent
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