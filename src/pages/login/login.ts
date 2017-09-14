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

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public af: AngularFireDatabase, private sp: StaffProvider, public loadingCtrl: LoadingController) {
    this.user = this.afAuth.authState;
    this.name1="howard@abacus.co";
    this.password1="123456";
  }
  // ngAfterViewInit(){
  //       this.LoginPage._setScrollDisabled(true);
  // }

  // setRoot(AvaPeriodPage) can make top left icon right
  get goToAvaPeriod(): string{
    // if (!params) params = {};
    this.navCtrl.setRoot(AvaPeriodPage);
    return "";
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
      loading.dismiss();
      if ( this.sp.authenticated == true ) {
        this.goToAvaPeriod;
      }
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
