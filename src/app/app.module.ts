import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AuthService } from '../providers/auth-service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { Signup } from '../pages/signup/signup';
import { Homejob } from '../pages/homejob/homejob';
import { Currentjobs } from '../pages/currentjobs/currentjobs';
import { Completejobs } from '../pages/completejobs/completejobs';
import { Profilejobs } from '../pages/profilejobs/profilejobs';
import { Jobdetailmodal } from '../pages/jobdetailmodal/jobdetailmodal';
import { Profile } from '../pages/profile/profile';
import {Push} from '@ionic-native/push';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { Proceed } from '../pages/proceed/proceed';
import { Jobs } from '../pages/jobs/jobs';

export const firebaseConfig = {
  apiKey: "AIzaSyDiEsYcLbpcWaQ0D-TuLSXV4Z7z21TNQRY",
  authDomain: "ontimecourier-504bc.firebaseapp.com",
  databaseURL: "https://ontimecourier-504bc.firebaseio.com",
  projectId: "ontimecourier-504bc",
  storageBucket: "ontimecourier-504bc.appspot.com",
  messagingSenderId: "471522107203"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    Signup,
    Homejob,
    Currentjobs,
    Completejobs,
    Profilejobs,
    Jobdetailmodal,
    Profile,
    Proceed,
    Jobs
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Login,
    Signup,
    Homejob,
    Currentjobs,
    Completejobs,
    Profilejobs,
    Jobdetailmodal,
    Profile,
    Proceed,
    Jobs
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
