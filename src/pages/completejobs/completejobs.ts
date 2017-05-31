import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController} from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Jobdetailmodal } from '../jobdetailmodal/jobdetailmodal';

/**
 * Generated class for the Completejobs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-completejobs',
  templateUrl: 'completejobs.html',
})
export class Completejobs {
jobsOngoing:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDatabase: AngularFireDatabase, public modalCtrl: ModalController) {

this.afDatabase.list('jobs', {
      query: {
        // orderByChild: 'status',
        // equalTo: '0'
      }
    }).subscribe(snapshot=>{
      //this.jobsOngoing=snapshot;
      //var i=0;
       snapshot.forEach(element => {
         
          //console.log(element.customername);
          //this.jobsOngoing[i]["fee"]=element.fee;
          //console.log(element.contact);
          //i++;
          this.jobsOngoing=snapshot;
          
         
       });

    });

  }

presentProfileModal(customername, date, fee, deliveryAddress, startAddress, distance, duration, contact) {
   let profileModal = this.modalCtrl.create(Jobdetailmodal, { customername: customername, date: date, fee:fee, deliveryAddress: deliveryAddress, startAddress:startAddress, distance:distance, duration:duration, contact:contact });
   profileModal.present();
   
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Completejobs');
  }

}
