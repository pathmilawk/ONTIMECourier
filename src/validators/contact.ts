import { FormControl } from '@angular/forms';

export class ContactValidator {

  static isValid(control: FormControl){
    const re = /^\d{10}$/.test(control.value);

    if (re){
      return null;
    }

    return {
      "invalidContact": true
    };

  }
}