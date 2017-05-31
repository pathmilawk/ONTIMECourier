import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Proceed } from './proceed';
import { HomePage } from '../home/home';

@NgModule({
  declarations: [
    HomePage,
    Proceed
  ],
  imports: [
    IonicPageModule.forChild(Proceed),
  ],
  exports: [
    HomePage,
    Proceed
  ]
})
export class ProceedModule {}
