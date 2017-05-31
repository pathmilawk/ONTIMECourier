import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Profilejobs } from './profilejobs';

@NgModule({
  declarations: [
    Profilejobs,
  ],
  imports: [
    IonicPageModule.forChild(Profilejobs),
  ],
  exports: [
    Profilejobs
  ]
})
export class ProfilejobsModule {}
