import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Homejob } from './homejob';

@NgModule({
  declarations: [
    Homejob,
  ],
  imports: [
    IonicPageModule.forChild(Homejob),
  ],
  exports: [
    Homejob
  ]
})
export class HomejobModule {}
