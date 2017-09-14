import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { StaffProvider } from '../../providers/staff/staff';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(public navCtrl: NavController, private sp: StaffProvider ) {
  }
  goToLogin(name,mobile,email,password){
    this.sp.emailSignUp(email, password, name, mobile)
    .then(aaa => {this.sp.authenticated; 
    console.log(this.sp.authenticated);
    // if ( this.sp.authenticated == true ) {
    //   this.goToLoginPage();
    // } else {
    //   this.goToLoginPage();
    // }
    })
    .catch(error => console.log(error));

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
  // }goToResetPassword(params){
  //   if (!params) params = {};
  //   this.navCtrl.push(ResetPasswordPage);
  // }goToLogin(params){
  //   if (!params) params = {};
  //   this.navCtrl.push(LoginPage);
  // }
}
