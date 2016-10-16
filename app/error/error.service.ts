import { Injectable } from '@angular/core';
import { Error } from './error';

@Injectable()
export class ErrorService {

  handleError(inError: any): Error {
    console.log(inError);
    var outError = new Error();
    var errMsg = <any>{};
    try {
      errMsg = JSON.parse(inError._body);
      outError.errorMessage = errMsg.error_description;
      outError.status = inError.status;
    } catch(e) {
      outError.errorMessage = 'Unable to connect to server';
      outError.status = '404';
    }
    return outError;
  }

}