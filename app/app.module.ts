import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { OauthLoginComponent } from './login/oauth-login.component';
import { UserDetailsComponent } from './admin/user-details.component';

import { ErrorService } from './error/error.service';

@NgModule({
  imports: [ 
  	BrowserModule,
  	FormsModule,
  	HttpModule,
    NgbModule.forRoot(),
    MaterialModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
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
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'oauth-login',
        component: OauthLoginComponent
      }
    ])
  ],
  declarations: [ 
  	AppComponent,
  	HomeComponent,
    NewAccountComponent,
    AdminComponent,
    LoginComponent,
    OauthLoginComponent,
    UserDetailsComponent
  ],
  providers: [
    CookieService,
    ErrorService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }