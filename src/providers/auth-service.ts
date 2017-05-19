import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'll lose the tree shaking benefits
import firebase from 'firebase/app';

import { Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  private authState: Observable<firebase.User>;
  private currentUser: firebase.User;
  private defaultProfileImage: string;

  constructor(public afAuth: AngularFireAuth) {
    console.log('Hello AuthService Provider');
    // this.authState = afAuth.authState;
    // afAuth.subscribe((user: firebase.User) => {
    //   this.currentUser = user;
    // });
  }

  // get authenticated(): boolean {
  //   return this.currentUser !== null;
  // }

  // signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
  //   return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  // }

  // signOut(): void {
  //   this.afAuth.signOut();
  // }

  // displayName(): string {
  //   if (this.currentUser !== null) {
  //     return this.currentUser.facebook.displayName;
  //   } else {
  //     return '';
  //   }
  // }


  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<any> {
    firebase.database().ref('/users')
    .child(firebase.auth().currentUser.uid).off();

    return this.afAuth.auth.signOut();
  }

  signupUser(newEmail: string, newPassword: string, name: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword)
    .then( newUser => {
        firebase.database().ref('/users').child(newUser.uid)
        .set({ email: newEmail,name: name  });
  });
  }

  uploadDefaultImage(){
    this.defaultProfileImage = 'data:image/jpeg;base64,' + '../assets/img/defaultUser.png';

    let storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);

  }

  getUserProfile(): Promise<any> {
  return new Promise( (resolve, reject) => {
    firebase.database().ref('/users')
    .child(firebase.auth().currentUser.uid)
    .on('value', data => {
      resolve(data.val());
    });
  });
}

}
