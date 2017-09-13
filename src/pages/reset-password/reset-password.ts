import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
// import { AvaPeriodPage } from '../ava-period/ava-period';
// import { AddPeriodPage } from '../add-period/add-period';
// import { AvaPeriodPage } from '../ava-period/ava-period';
// import { SignupPage } from '../signup/signup';
// import { LoginPage } from '../login/login';
// import { ResetPasswordPage } from '../reset-password/reset-password';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html'
})
export class ResetPasswordPage {

  constructor(public navCtrl: NavController) {
  }
  goToLogin(params){
    if (!params) params = {};
    this.navCtrl.push(LoginPage);
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
