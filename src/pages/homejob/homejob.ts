import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Currentjobs } from '../currentjobs/currentjobs';
import { Completejobs } from '../completejobs/completejobs';
import { Profilejobs } from '../profilejobs/profilejobs';
import { AuthService } from '../../providers/auth-service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
/**
 * Generated class for the Homejob page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-homejob',
  templateUrl: 'homejob.html',
})
export class Homejob {

  Ongoing: any = Currentjobs;
  Completed: any = Completejobs;
  Profile: any = Profilejobs;
  public jobsOngoing: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthService, public events: Events, public afDatabase: AngularFireDatabase) {
    //this.jobsOngoing = afDatabase.list('/jobs');

    //console.log(this.jobsOngoing);
    
    
    //setTimeout(console.log(this.jobsOngoing), 5000);
    //console.log(this.jobsOngoing);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Homejob');
    //console.log(this.jobsOngoing);
  }

  logout() {
    this.events.publish('user:logout');
  }



}
