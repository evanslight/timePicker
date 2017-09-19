import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AvaPeriodPage } from '../ava-period/ava-period';
import { AddPeriodPage } from '../add-period/add-period';
import { StaffProvider } from '../../providers/staff/staff';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  userInfor: any;
  length: any;
  phone: string;
  email: string;
  userid: any;
  role: any;
  name: any;

  constructor(public navCtrl: NavController, private sp: StaffProvider, private db: AngularFireDatabase) {
    // console.log('profile userInfor ->', navParams.get('item'));
    // console.log("which user profile -> "+this.sp.whichUser);
    this.sp.retrieve().subscribe(profile => {
      // console.log("profile.name -> "+profile.val());
      this.userInfor=profile.val()
      // console.log(this.userInfor);

      this.length=Object.keys(this.userInfor.tasks).length;
      // console.log(this.length);
      this.role=this.userInfor.role

      // this.name=this.userInfor.name
    });
  }
  // goToAvaPeriod(params){
  //   if (!params) params = {};
  //   this.navCtrl.push(AvaPeriodPage);
  // }
  // goToAddPeriod(params){
  //   if (!params) params = {};
  //   this.navCtrl.push(AddPeriodPage);
  // }

  update(email, phone){
    if (email != null) {
      this.email=email
      console.log('email is '+email);
    } else {
      this.email=this.userInfor.email
    }

    if (phone != null) {
      this.phone=phone
      console.log('phone is '+phone);
    } else {
      this.phone=this.userInfor.mobile
    }

    // console.log('this email is '+this.email);
    // console.log('this phone is '+this.phone);
    // // this.updateProfile(email,phone);
    this.sp.updateProfile(this.email,this.phone)

  }

  // onInputTime(email){
  //   console.log('email is '+email);

  // }

  // private updateProfile(email,phone): void {
  //   // Writes user name and email to realtime db
  //   // useful if your app displays information about users or for admin features

  //   const emailPath = `users/${this.userid}/email`; // Endpoint on firebase
  //   const mobilePath = `users/${this.userid}/mobile`; 
  //   // const data = {
  //   //   email: email,
  //   //   mobile: phone
  //   // }
  //   this.db.object(emailPath).set(email)
  //     .catch(error => console.log(error));
    
      
  //   this.db.object(mobilePath).set(phone)
  //     .catch(error => console.log(error));
  // }

 ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    // console.log("profile -> ");
    // console.log(this.userInforStaff);
  }



}
