import { Component, Input } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { FormControl,  FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AvaPeriodPage } from '../ava-period/ava-period';
import { AddPeriodPage } from '../add-period/add-period';
import { StaffProvider } from '../../providers/staff/staff';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {


  userInforStaff: any;
  length: any;
  phone: string;
  email: string;
  userid: any;

  constructor(public navCtrl: NavController,  private navParams: NavParams, private db: AngularFireDatabase) {
    console.log('profile userInforStaff ->', navParams.get('item'));
    this.userInforStaff=navParams.get('item');
    console.log("profile -> ");
    console.log(this.userInforStaff);

    console.log('profile id ->', navParams.get('id'));
    this.userid=navParams.get('id');
    
    this.length=Object.keys(this.userInforStaff.tasks).length;
    console.log(this.length);

  }
  goToAvaPeriod(params){
    if (!params) params = {};
    this.navCtrl.push(AvaPeriodPage);
  }
  goToAddPeriod(params){
    if (!params) params = {};
    this.navCtrl.push(AddPeriodPage);
  }

  update(email, phone){
    if (email != null) {
      this.email=email
      console.log('email is '+email);
    } else {
      this.email=this.userInforStaff.email
    }

    if (phone != null) {
      this.phone=phone
      console.log('phone is '+phone);
    } else {
      this.phone=this.userInforStaff.mobile
    }

    console.log('this email is '+this.email);
    console.log('this phone is '+this.phone);
    this.updateProfile(email,phone);

  }

  onInputTime(email){
    console.log('email is '+email);

  }

  private updateProfile(email,phone): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    const emailPath = `users/${this.userid}/email`; // Endpoint on firebase
    const mobilePath = `users/${this.userid}/mobile`; 
    // const data = {
    //   email: email,
    //   mobile: phone
    // }
const data ={phone,email}
    this.db.object(emailPath).set(email)
      .catch(error => console.log(error));
    
      
    this.db.object(mobilePath).set(phone)
      .catch(error => console.log(error));
  }

 ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    // console.log("profile -> ");
    // console.log(this.userInforStaff);
  }

  // showPrompt(title) {
  //   let prompt = this.alertCtrl.create({
  //     title: title,
  //     message: "Enter a name for this new album you're so keen on adding",
  //     inputs: [
  //       {
  //         name: title,
  //         placeholder: title
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Upload',
  //         handler: data => {
  //           console.log('Saved clicked');
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

  // ngAfterContentInit() {
  //   console.log('ngAfterContentInit - wrapper', this.wrapper);
  //   console.log('ngAfterContentInit - content', this.content);
  // }

}


export class EmailValidator {

    static isValid(control: FormControl){

        var re = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+”))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value);

        if (re){
            return null;
        }

        return {"invalidEmail": true};
    }

}