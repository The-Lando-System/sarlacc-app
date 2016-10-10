import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [ 
  	BrowserModule,
  	FormsModule,
  	HttpModule,
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
      }
    ])
  ],
  declarations: [ 
  	AppComponent,
  	HomeComponent,
    NewAccountComponent,
    AdminComponent,
    LoginComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }