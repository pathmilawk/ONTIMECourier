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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    Signup
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
    Signup
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
