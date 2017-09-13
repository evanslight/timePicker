import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AvaPeriodPage } from '../ava-period/ava-period';
import { AddPeriodPage } from '../add-period/add-period';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController) {
  }
  goToAvaPeriod(params){
    if (!params) params = {};
    this.navCtrl.push(AvaPeriodPage);
  }
  goToAddPeriod(params){
    if (!params) params = {};
    this.navCtrl.push(AddPeriodPage);
  }

}
