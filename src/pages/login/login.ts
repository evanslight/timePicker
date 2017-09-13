import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AvaPeriodPage } from '../ava-period/ava-period';
import { AddPeriodPage } from '../add-period/add-period';
import { SignupPage } from '../signup/signup';
import { ResetPasswordPage } from '../reset-password/reset-password';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
    
  }
  // ngAfterViewInit(){
  //       this.LoginPage._setScrollDisabled(true);
  // }

  goToAvaPeriod(params){
    if (!params) params = {};
    this.navCtrl.push(AvaPeriodPage);
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
