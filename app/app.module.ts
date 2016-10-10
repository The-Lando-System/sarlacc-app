import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { HttpModule }	 from '@angular/http';


import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [ 
  	BrowserModule,
  	FormsModule,
  	HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ])
  ],
  declarations: [ 
  	AppComponent,
  	HomeComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }