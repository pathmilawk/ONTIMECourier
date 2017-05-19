import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';
import { Signup } from '../signup/signup';
import { HomePage } from '../home/home';

@NgModule({
  declarations: [
    Login,
    Signup,
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(Login),
  ],
  exports: [
    Login,
    Signup,
    HomePage
  ]
})
export class LoginModule {}
