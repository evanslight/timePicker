import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { StaffProvider } from '../../providers/staff/staff';
import { AvaPeriodPage } from '../ava-period/ava-period';
import * as moment from 'moment';
/**
 * Generated class for the EditPeriodPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-period',
  templateUrl: 'edit-period.html',
})
export class EditPeriodPage {

  today = new Date();
  period: any;
  taskKey: any;

  fromDate: any;
  toDate: any;
  startTime: any;
  endTime: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sp: StaffProvider) {
  	console.log('period is -> ', navParams.get('period'));
  	this.period=navParams.get('period');
  	this.taskKey=navParams.get('taskKey');
	this.fromDate=this.period.fromDate
	this.toDate=this.period.toDate
	this.startTime=this.period.startTime
	this.endTime=this.period.endTime


  }

  // goToBack() {
  //   //push another page onto the history stack
  //   //causing the nav controller to animate the new page in
  //   this.navCtrl.pop();
  // }

  presentConfirm(fromDate, toDate, startTime, endTime, taskID){

	let newfromDate=moment(fromDate).format('YYYY-MM-DD');
	let newToDate=moment(toDate).format('YYYY-MM-DD');
	console.log(taskID);
	this.sp.editPeriod(newfromDate, newToDate, startTime, endTime, taskID)
  	this.navCtrl.setRoot(AvaPeriodPage); 
  }

  convertDate(datetime) {
  	let dd = this.today.getDate();
  	let mm = this.today.getMonth()+1; //January is 0!
  	let yyyy = this.today.getFullYear();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPeriodPage');
  }

}
