import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { EmailValidator } from '../../validators/email';

import { Signup } from '../signup/signup';
import { HomePage } from '../home/home';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  loginForm: FormGroup;
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public authData: AuthService, public formBuilder: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

    this.loginForm = formBuilder.group({
    email: ['', Validators.compose([Validators.required,
        EmailValidator.isValid])],
    password: ['', Validators.compose([Validators.minLength(6),
    Validators.required])]
    });

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  signupTapped() {
    this.navCtrl.push(Signup);
  }

  //  loginTapped() {
  //    this.events.publish('user:login');
  //  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        this.events.publish('user:login');
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
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
