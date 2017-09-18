import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AvaPeriodPage } from '../pages/ava-period/ava-period';
import { AddPeriodPage } from '../pages/add-period/add-period';
import { ProfilePage } from '../pages/profile/profile';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { AdminPagePage } from '../pages/admin-page/admin-page';
import { StaffProvider } from '../providers/staff/staff';

import { LoginPage } from '../pages/login/login';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public afAuth: AngularFireAuth, private sp: StaffProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToAddPeriod(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AddPeriodPage);
  }

  goToProfile(params){
    if (!params) params = {};
    // this.navCtrl.setRoot(ProfilePage);
    this.sp.retrieveTasklist("profile")
  }

  goToAvaPeriod(params){
    if (!params) params = {};
    this.sp.retrieveTasklist("task")
    // console.log("staff userInfo app component->")
    // console.log(this.sp.userInforStaff)
    // this.navCtrl.setRoot(AvaPeriodPage,{item: this.sp.userInforStaff});
  }

  goToSignup(params){
    if (!params) params = {};
    this.navCtrl.setRoot(SignupPage);
  }

  goToLogin(params){
    if (!params) params = {};
    // this.sp.readDestroy();
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

  goToResetPassword(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ResetPasswordPage);
  }

  goToAdminPage(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AdminPagePage);
  }
}
