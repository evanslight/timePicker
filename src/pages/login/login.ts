import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AvaPeriodPage } from '../ava-period/ava-period';
import { AddPeriodPage } from '../add-period/add-period';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';

import { StaffProvider } from '../../providers/staff/staff';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: Observable<firebase.User>;
  name1: any;
  password1: any;
  item: any;
  items: any;
  currentTaskList: any;

  constructor(public navCtrl: NavController, 
    public afAuth: AngularFireAuth, 
    public af: AngularFireDatabase, 
    private sp: StaffProvider, 
    public loadingCtrl: LoadingController) {

    this.user = this.afAuth.authState;
    this.name1="howard@abacus.co";
    this.password1="123456";
    // this.item=this.sp.retrieveTasklist();
  }
  // ngAfterViewInit(){
  //       this.LoginPage._setScrollDisabled(true);
  // }

  // setRoot(AvaPeriodPage) can make top left icon right
  goToAvaPeriod(){
    // if (!params) params = {};
    // this.navCtrl.setRoot(AvaPeriodPage,{item: this.item});
    this.navCtrl.setRoot(AvaPeriodPage,{item: this.currentTaskList});
    // this.navCtrl.push(AvaPeriodPage);
  }

  // login with username and password
  login(username, password) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.sp.emailLogin(username, password)
    .then(aaa => {
      this.sp.authenticated; 
      console.log("login->this.sp.whichUser "+this.sp.whichUser); 

          const path = `users/${this.sp.whichUser}`;

          firebase.database().ref(path).once('value').then((snapshot)=> {
            console.log("login->snapshot "+snapshot.val().tasks); 
            this.currentTaskList=snapshot.val();
            loading.dismiss();
            if ( this.sp.authenticated == true ) {
              this.goToAvaPeriod();
            }
          })

      // this.sp.retrieveTasklist(this.sp.currentUser);
      // console.log("login->this.sp.userInfo "+this.sp.userInfo); 
      // loading.dismiss();
      // if ( this.sp.authenticated == true ) {
      //   this.goToAvaPeriod(this.currentTaskList);
      // }
      
    })
    .catch((error) => {
      console.log("error "+error);   
    }) ;
    
  }
  

  goToAddPeriod(params){
    if (!params) params = {};
    this.navCtrl.push(AddPeriodPage);
  }

  goToSignup(params){
    if (!params) params = {};
    this.navCtrl.push(SignupPage);
  }

  goToResetPassword(params){
    if (!params) params = {};
    this.navCtrl.push(ResetPasswordPage);
  }

}
