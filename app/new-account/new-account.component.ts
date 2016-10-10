import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-new-account',
  templateUrl: 'new-account.component.html',
  styleUrls: [ 'new-account.component.css' ]
})
export class NewAccountComponent  {
  title = 'Create a New Account!';
}