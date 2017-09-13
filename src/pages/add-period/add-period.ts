import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AvaPeriodPage } from '../ava-period/ava-period';

@Component({
  selector: 'page-add-period',
  templateUrl: 'add-period.html'
})
export class AddPeriodPage {

  constructor(public navCtrl: NavController) {
  }
  goToAvaPeriod(params){
    if (!params) params = {};
    this.navCtrl.push(AvaPeriodPage);
  }

}
