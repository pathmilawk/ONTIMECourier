import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { EmailValidator } from '../../validators/email';
import { NameValidator } from '../../validators/name';
import { Login } from '../login/login';
//import {AngularFire, FirebaseListObservable} from 'angularfire2';

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class Signup {

  //users: FirebaseListObservable<any>;
  public signupForm: FormGroup;
  public loading: Loading;

  constructor(public nav: NavController, public navParams: NavParams, public authData: AuthService,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      name: ['', Validators.compose([Validators.required, NameValidator.isValid])],
      confirmpassword: ['', Validators.compose([Validators.required])],
    });
  }

  // static passwordsMatch(cg: FormGroup): { [err: string]: any } {
  //   let pwd1 = cg.get('password');
  //   let pwd2 = cg.get('confirmpassword');
  //   let rv: { [error: string]: any } = {};
  //   if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
  //     rv['passwordMismatch'] = true;
  //   }
  //   return rv;
  // }

//   matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
//   return (group: FormGroup): {[key: string]: any} => {
//     let password = group.controls[passwordKey];
//     let confirmPassword = group.controls[confirmPasswordKey];

//     if (password.value !== confirmPassword.value) {
//       return {
//         mismatchedPasswords: true
//       };
//     }
//   }
// }   //, {validator: this.matchingPasswords('password','confirmpassword')}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

  signup() {
    //console.log('fgffgfgfgfg Signup');
    var details = {
      "name": 'pathmila',
      "username": 'pathmila',

    }

    //var newPostKey = firebase.database().ref().child('post').push().key;
  }


  signupUser() {
    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.name)
        .then(() => {
          this.nav.push(Login);
        }, (error) => {
          this.loading.dismiss().then(() => {
            var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

}
