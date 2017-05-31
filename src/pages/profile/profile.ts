import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {
userProfile:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider:AuthService) {
    this.getProfileDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

  getProfileDetails(): any {
    this.authProvider.getUserProfile().then(profileSnap => {
      this.userProfile = profileSnap;
      //console.log(this.userProfile.name);
    });
  }

}
