import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
// Do not import from 'firebase' as you'll lose the tree shaking benefits
import firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
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
public jobsOngoing: FirebaseListObservable<any>;
public jobsNode:any;
public fireRef:any;
  constructor(public afAuth: AngularFireAuth,public afDatabase:AngularFireDatabase) {
    console.log('Hello AuthService Provider');
    // this.authState = afAuth.authState;
    // afAuth.subscribe((user: firebase.User) => {
    //   this.currentUser = user;
    // });

    this.fireRef = firebase.database().ref();
    this.jobsNode = firebase.database().ref('jobs');
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

  signupUser(newEmail: string, newPassword: string, fname: string,lname:string, contact:string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword)
    .then( newUser => {
        firebase.database().ref('/users').child(newUser.uid)
        .set({ email: newEmail,firstname: fname, type: 1, lastname:lname , contact:contact});
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

storeJobs(fee: any, weight: any,fragility: any, distance: any, duration: any, startAddress:any, deliveryAddress:any,firstname:any,lastname:any,contact:any,accept:any): firebase.Promise<any>{

var newPostKey = this.jobsNode.push().key;

//get date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

var d,m="";

if(dd<10) {
    d='0'+dd
}
else{
  d=dd;
} 

 if(mm<10) {
     m='0'+mm.toString()
 }
 else{
   m=mm.toString();
 } 

var date=mm+'/'+dd+'/'+yyyy;;


var postData = {
          fee: fee,
          weight: weight,
          fragility:fragility,
          distance:distance,
          duration:duration,
          startAddress:startAddress,
          deliveryAddress:deliveryAddress,
          date:date,
          status:0,
          customername:firstname+' '+lastname,
          contact:contact,
          accept:accept
        };
      

var updatePath = {};
        updatePath['/jobs/' + newPostKey] = postData;
        return this.fireRef.update(updatePath);  

  }  
 


}
