import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'll lose the tree shaking benefits
import firebase from 'firebase/app';

import { Platform } from 'ionic-angular';

/*
  Generated class for the ProfileService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileService {

  private authState: Observable<firebase.User>;
  private currentUser: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    console.log('Hello ProfileService Provider');
  }

  getUserProfile(): Promise<any> {
  return new Promise( (resolve, reject) => {
    firebase.database().ref('/userProfile')
    .child(firebase.auth().currentUser.uid)
    .on('value', data => {
      resolve(data.val());
    });
  });
}

}
