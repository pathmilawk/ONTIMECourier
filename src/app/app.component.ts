import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
//import { ProfileService } from '../providers/profile-service';
import { AuthService } from '../providers/auth-service';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;
  pages: Array<{ title: string, component: any }>;
  activePage:any;
  public userProfile: any;
  loading: Loading;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events,
    public alertCtrl: AlertController, public authProvider: AuthService, public loadingCtrl: LoadingController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      
      { title: 'Home', component: HomePage },
      { title: 'Login', component: Login },
      { title: 'List', component: ListPage },
      { title: 'Signup', component: Signup }
    ];

    this.activePage = this.pages[0];

    events.subscribe('user:login', () => {
      this.loginTapped();
    });

    events.subscribe('user:profiledetails', () => {
      this.getProfileDetails();
    });
    // events.subscribe('user:signup', () => {
    //   this.signUpTapped();
    // });

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
    this.activePage=page;
  }

  checkActive(page){
    return page==this.activePage;
  }

  loginTapped() {
    //this.nav.(HomePage);
    this.nav.setRoot(HomePage);
    // this.nav.push(HomePage);
    // this.nav.pop(Login);
  }

  logout(){
    this.authProvider.logoutUser()
     .then( authData => {
        this.nav.setRoot(Login);
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
  

  getProfileDetails(): any {
    this.authProvider.getUserProfile().then(profileSnap => {
      this.userProfile = profileSnap;
      //console.log(this.userProfile.name);
    });
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


