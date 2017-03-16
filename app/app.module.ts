import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent }  from './app.component';
import { NewAccountComponent } from './admin/new-account.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
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
        component: HomeComponent
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
    UserDetailsComponent
  ],
  providers: [
    CookieService,
    ErrorService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }