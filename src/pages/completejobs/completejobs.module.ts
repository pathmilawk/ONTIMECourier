import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Completejobs } from './completejobs';

@NgModule({
  declarations: [
    Completejobs,
  ],
  imports: [
    IonicPageModule.forChild(Completejobs),
  ],
  exports: [
    Completejobs
  ]
})
export class CompletejobsModule {}
