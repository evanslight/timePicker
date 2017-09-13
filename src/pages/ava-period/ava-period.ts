import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddPeriodPage } from '../add-period/add-period';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-ava-period',
  templateUrl: 'ava-period.html'
})
export class AvaPeriodPage {

  constructor(public navCtrl: NavController) {
  	// this.navCtrl.setRoot(AvaPeriodPage);
  }
  

  goToAddPeriod(params){
    if (!params) params = {};
    this.navCtrl.push(AddPeriodPage);
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

}
