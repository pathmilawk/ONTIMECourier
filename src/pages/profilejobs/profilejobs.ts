import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

/**
 * Generated class for the Profilejobs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profilejobs',
  templateUrl: 'profilejobs.html',
})
export class Profilejobs {
userProfile:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider:AuthService) {
    this.getProfileDetails();
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profilejobs');
  }

  getProfileDetails(): any {
    this.authProvider.getUserProfile().then(profileSnap => {
      this.userProfile = profileSnap;
      //console.log(this.userProfile.name);
    });
  }

}
