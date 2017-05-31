import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Jobdetailmodal } from '../jobdetailmodal/jobdetailmodal';
import * as firebase from 'firebase';
/**
 * Generated class for the Currentjobs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-currentjobs',
  templateUrl: 'currentjobs.html',
})
export class Currentjobs {
  jobsOngoing:any;
  private fireRef:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public afDatabase: AngularFireDatabase, public modalCtrl: ModalController) {
    this.fireRef = firebase.database().ref();
    
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
          console.log(this.jobsOngoing);
         
       });

    });
  }

presentProfileModal(customername, date, fee, deliveryAddress, startAddress, distance, duration, contact) {
   let profileModal = this.modalCtrl.create(Jobdetailmodal, { customername: customername, date: date, fee:fee, deliveryAddress: deliveryAddress, startAddress:startAddress, distance:distance, duration:duration, contact:contact });
   profileModal.present();
   
 }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad Currentjobs');
  }

  accept(key){
   


     let alert = this.alertCtrl.create({
      title: 'Accept Delivery',
      message: 'Do you want to accept this delivery?',

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
 console.log(key);
       var updatePath = {};
     updatePath['/jobs/' + key+"/accept"] = 1;
    
     return this.fireRef.update(updatePath);
        
          }




        }
      
    ]
  });
  alert.present();

  }

}
