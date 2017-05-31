import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service';
import { EmailValidator } from '../../validators/email';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class Jobs {

  Jobs: any;
  jobsOngoing: any;
  jobsCompleted: any;
  userProfile: any;

  constructor(public navCtrl: NavController, public afDatabase: AngularFireDatabase, public authProvider: AuthService) {

    this.Jobs = "current";


    this.afDatabase.list('jobs', {

    }).subscribe(snapshot => {

      snapshot.forEach(element => {

        this.authProvider.getUserProfile().then(profileSnap => {
          this.userProfile = profileSnap;

          var user = this.userProfile.firstname + ' ' + this.userProfile.lastname;
          if (element.status == '0' && element.customername == user) {

            this.jobsOngoing = snapshot;

          }
        });

      });



    });


    this.afDatabase.list('jobs', {

    }).subscribe(snapshot => {

      snapshot.forEach(element => {

        this.authProvider.getUserProfile().then(profileSnap => {
          this.userProfile = profileSnap;

          var user = this.userProfile.firstname + ' ' + this.userProfile.lastname;
          if (element.status == '1' && element.customername == user) {

            this.jobsCompleted = snapshot;

          }
        });

      });



    });






  }



}
