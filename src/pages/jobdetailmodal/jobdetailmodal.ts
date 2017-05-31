import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the Jobdetailmodal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-jobdetailmodal',
  templateUrl: 'jobdetailmodal.html',
})
export class Jobdetailmodal {

  customername:any;
  date:any;
  fee:any;
  deliveryAddress:any;
  startAddress:any;
  distance:any;
  duration:any;
  contact:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) {
    this.customername=navParams.get('customername');
    this.date=navParams.get('date');
    this.fee=navParams.get('fee');
    this.deliveryAddress=navParams.get('deliveryAddress');
    this.startAddress=navParams.get('startAddress');
    this.distance=navParams.get('distance');
    this.duration=navParams.get('duration');
    this.contact=navParams.get('contact');

    console.log(this.contact);
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Jobdetailmodal');
  }

}
