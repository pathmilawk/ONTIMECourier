import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from '../login/login';
import { Signup } from '../signup/signup';
import { HomePage } from '../home/home';
import { Jobs } from '../jobs/jobs';

@NgModule({
  declarations: [
    Login,
    Signup,
    HomePage,
    Jobs
  ],
  imports: [
    IonicPageModule.forChild(Login),
  ],
  exports: [
    Login,
    Signup,
    HomePage,Jobs
  ]
})
export class JobsModule {}