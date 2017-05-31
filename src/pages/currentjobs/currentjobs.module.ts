import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Currentjobs } from './currentjobs';

@NgModule({
  declarations: [
    Currentjobs,
  ],
  imports: [
    IonicPageModule.forChild(Currentjobs),
  ],
  exports: [
    Currentjobs
  ]
})
export class CurrentjobsModule {}
