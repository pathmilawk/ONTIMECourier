import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
//import { ProfileService } from '../providers/profile-service';
import { AuthService } from '../providers/auth-service';

import { HomePage } from '../pages/home/home';
import { Homejob } from '../pages/homejob/homejob';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { Currentjobs } from '../pages/currentjobs/currentjobs';
import { Completejobs } from '../pages/completejobs/completejobs';
import { Profilejobs } from '../pages/profilejobs/profilejobs';
import { Profile } from '../pages/profile/profile';
import { Jobdetailmodal } from '../pages/jobdetailmodal/jobdetailmodal';
import {Push, PushObject, PushOptions} from '@ionic-native/push';


import { Jobs } from '../pages/jobs/jobs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;
  pages: Array<{ title: string, component: any }>;
  activePage: any;
  public userProfile: any;
  loading: Loading;
  public userType: boolean;

  constructor(public platform: Platform, public statusBar: StatusBar, public push:Push, public splashScreen: SplashScreen, public events: Events,
    public alertCtrl: AlertController, public authProvider: AuthService, public loadingCtrl: LoadingController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [

      { title: 'Home', component: HomePage },
      { title: 'Profile', component: Profile },
      { title: 'History', component: Jobs }
    ];

    this.activePage = this.pages[0];

    events.subscribe('user:login', () => {
      this.loginTapped();
    });

    events.subscribe('user:profiledetails', () => {
      this.getProfileDetails();
    });

    events.subscribe('user:logout', () => {
      this.logout();
    });
    // events.subscribe('user:signup', () => {
    //   this.signUpTapped();
    // });
events.subscribe('user:gotohome', () => {
      this.gotohome();
    });
    this.pushsetup();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.hide();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  checkActive(page) {
    return page == this.activePage;
  }

  loginTapped() {
    //this.nav.(HomePage);
    this.authProvider.getUserProfile().then(profileSnap => {
      this.userProfile = profileSnap;
      if (this.userProfile.type == 0) {
        this.nav.setRoot(Homejob);
        this.userType = true;
      }
      else {
        this.nav.setRoot(HomePage);
        this.userType = false;
      }
    });
    //alert(this.userProfile.name);

    // this.nav.push(HomePage);
    // this.nav.pop(Login);
  }

  logout() {
    this.authProvider.logoutUser()
      .then(authData => {
        this.nav.setRoot(Login);
      }, error => {
        this.loading.dismiss().then(() => {
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


  getProfileDetails(): any {
    this.authProvider.getUserProfile().then(profileSnap => {
      this.userProfile = profileSnap;
      //console.log(this.userProfile.name);
    });
  }



gotohome() {
    
    this.nav.pop();
   
  }


pushsetup(){
  console.log('Notifications');
   const options: PushOptions = {
     android: {
        senderID: '471522107203'
    },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {}
  };
 
  const pushObject: PushObject = this.push.init(options);
 
  pushObject.on('notification').subscribe((notification: any) => {
    if(notification.additionalData.foreground){
      let youralert = this.alertCtrl.create({
        title:'ONTIME Courier',
        message: notification.message
      });
      youralert.present();
    }
  });
 
  pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
 
  pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
}


}



// ionicBootstrap(MyApp, [
//    FIREBASE_PROVIDERS, defaultFirebase({
//       apiKey: "AIzaSyCw1SKmz1Bu2ibncu5Bxd1sZgR1taV7ujM",
//       authDomain: "aftutorial-ef306.firebaseapp.com",
//       databaseURL: "https://aftutorial-ef306.firebaseio.com",
//       storageBucket: "aftutorial-ef306.appspot.com"
//     }) 
//   ]);


