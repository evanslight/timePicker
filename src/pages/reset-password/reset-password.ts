import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { StaffProvider } from '../../providers/staff/staff';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {

  constructor(public navCtrl: NavController, private sp: StaffProvider) {

  }
  goToLogin(params){
    if (!params) params = {};

    this.sp.resetPassword(params);
    this.navCtrl.push(LoginPage);
  }
  back(){
    this.navCtrl.pop();
  }
  // goToAvaPeriod(params){
  //   if (!params) params = {};
  //   this.navCtrl.push(AvaPeriodPage);
  // }goToAddPeriod(params){
  //   if (!params) params = {};
  //   this.navCtrl.push(AddPeriodPage);
  // }goToAvaPeriod(params){
  //   if (!params) params = {};
  //   this.navCtrl.push(AvaPeriodPage);
  // }goToSignup(params){
  //   if (!params) params = {};
  //   this.navCtrl.push(SignupPage);
  // }goToLogin(params){
  //   if (!params) params = {};
  //   this.navCtrl.push(LoginPage);
  // }goToResetPassword(params){
  //   if (!params) params = {};
  //   this.navCtrl.push(ResetPasswordPage);
  // }
}
