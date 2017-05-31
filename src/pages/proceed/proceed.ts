import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController, Loading, AlertController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { EmailValidator } from '../../validators/email';
import { NameValidator } from '../../validators/name';


import { HomePage } from '../home/home';

//import { Login } from '../login/login';
//import {AngularFire, FirebaseListObservable} from 'angularfire2';

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google;

@Component({
  selector: 'page-proceed',
  templateUrl: 'proceed.html',
})
export class Proceed {
  //arr: any;
  add1: any;
  add2: any;
  public distanceG: any = "";
  public durationG: any = "";
  proceedForm: FormGroup;
 firstname:any;
 lastname:any;
 contact:any;

  public selectedWeight: any;
  loading: Loading;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController,public loadingCtrl: LoadingController, public alertCtrl: AlertController, public events: Events, public prmCtrl: NavParams, public formBuilder: FormBuilder, public authData: AuthService) {


    this.add1 = prmCtrl.get("add1");
    this.add2 = prmCtrl.get("add2");

    this.getDistance();

    this.proceedForm = this.formBuilder.group({
      weight: [1, Validators.compose([Validators.required])],
      fragile: [1, Validators.compose([Validators.required])],
    });

        this.getUserDetails();
  }


getUserDetails(){
   this.authData.getUserProfile().then(profileSnap => {
      this.firstname = profileSnap.firstname;
      this.lastname=profileSnap.lastname;
      this.contact=profileSnap.contact;
      //console.log(this.userProfile.name);
    });
}

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Request was added successfully. You will be notify later.',
      position:'middle',
      duration: 4000
    });
    toast.present();
  }


  //get distance and time
  getDistance() {

    var arr = { dis: null, dur: null };

    var origin1 = null;
    var origin2 = this.add1;
    var destinationA = this.add2;
    var destinationB = null;

    var geocoder = new google.maps.Geocoder();

    //from location
    geocoder.geocode({ 'address': this.add1 }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {

        origin1 = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        //origin1.lng=;

        //alert("location : " + origin1); 
      } else {
        alert("Something got wrong " + status);
      }
    });


    //to location
    geocoder.geocode({ 'address': this.add2 }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {

        destinationB = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());;
        //var b=results[0].geometry.location.lng();

        //alert("location : " + origin1+'fdfd'+origin2); 

        var service = new google.maps.DistanceMatrixService;

        service.getDistanceMatrix({
          origins: [origin1, origin2],
          destinations: [destinationA, destinationB],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function (response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {


            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;

            for (var i = 0; i < origins.length; i++) {
              var results = response.rows[i].elements;
              //console.log(results);
              for (var j = 0; j < results.length; j++) {
                var element = results[j];
                var distance = element.distance.text;
                var duration = element.duration.text;

                var from = origins[i];
                var to = destinations[j];
              }
            }

            //console.log(distance + " dd " + duration);

            this.distanceG = distance;
            this.durationG = duration;
            // this.loadF();

            //arr.dis=distance;
            //arr.dur=duration;
            console.log(this.distanceG + 'mmmdfndnfdf' + this.duration);



          }
        });


      }
      else {
        alert("Something got wrong " + status);
      }

    });

  }


  //confirm order
  orderConfirm(fee: any, weight: any,fragility: any, distance: any, duration: any, startAddress:any, deliveryAddress:any,firstname:any,lastname:any,contact:any,accept:any) {
    let alert = this.alertCtrl.create({
      title: 'Confirm delivery',
      message: 'You have to pay ' + fee + '. Do you want to continue?',

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Proceed',
          handler: () => {

            this.authData.storeJobs(fee, weight,fragility, distance, duration, startAddress, deliveryAddress,firstname,lastname,contact,accept)
              .then(() => {
                //alert and go to home
                this.presentToast();
                this.events.publish('user:gotohome');
              }, error => {
                this.loading.dismiss().then(() => {
                  let alert = this.alertCtrl.create({
                    message: error.message,
                    buttons: [
                      {
                        text: "Ok",
                        role: 'cancel'
                      }
                    ]
                  });
                  alert.present();
                });
              });

            this.loading = this.loadingCtrl.create({
              dismissOnPageChange: true,
            });
            this.loading.present();
          }





        }
      
    ]
  });
  alert.present();
}


submitProceedForm() {

  var distance = 3.5;
  var duration = 7;
  var weight = this.proceedForm.value.weight;
  var fragile = this.proceedForm.value.fragile;
  
  var fragility = 0;
  var weightFee = 0;
  var cost = 100;
  var fee = 0;
  var perKM = 2;
var accept='0';

  //check fragility
  if (fragile == 1) {
    fragility = 50;
  }

  //check weight
  if (weight == 1) {
    weightFee = 100;
  }
  else if (weight == 2) {
    weightFee = 200;
  }
  else if (weight == 3) {
    weightFee = 300;
  }

  fee = fragility + weightFee + cost + distance*perKM;

  var dis=distance+" km";
  var dur=distance+" min";

  this.orderConfirm(fee,weight,fragile,dis,dur,this.add1,this.add2,this.firstname,this.lastname,this.contact,accept);

}



}
