import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
// import { AvaPeriodPage } from '../ava-period/ava-period';
// import { AddPeriodPage } from '../add-period/add-period';
// import { AvaPeriodPage } from '../ava-period/ava-period';
// import { SignupPage } from '../signup/signup';
// import { ResetPasswordPage } from '../reset-password/reset-password';
// import { LoginPage } from '../login/login';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

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
  // }goToResetPassword(params){
  //   if (!params) params = {};
  //   this.navCtrl.push(ResetPasswordPage);
  // }goToLogin(params){
  //   if (!params) params = {};
  //   this.navCtrl.push(LoginPage);
  // }
}
