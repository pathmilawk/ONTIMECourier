import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Jobdetailmodal } from './jobdetailmodal';

@NgModule({
  declarations: [
    Jobdetailmodal,
  ],
  imports: [
    IonicPageModule.forChild(Jobdetailmodal),
  ],
  exports: [
    Jobdetailmodal
  ]
})
export class JobdetailmodalModule {}
