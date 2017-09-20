import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { StaffProvider } from '../../providers/staff/staff';
import { AvaPeriodPage } from '../ava-period/ava-period';
import * as moment from 'moment';

import {
  CalendarModalOptions,
  CalendarModal,
  DayConfig
} from 'ion2-calendar'
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

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController, private sp: StaffProvider) {
  	console.log('period is -> ', navParams.get('period'));
  	this.period=navParams.get('period');
  	this.taskKey=navParams.get('taskKey');
	// this.fromDate=this.period.fromDate
	// this.toDate=this.period.toDate
	  this.startTime=this.period.startTime
	  this.endTime=this.period.endTime
    this.fromDate = moment(this.period.fromDate).format('DD MMM YYYY');
    this.toDate = moment(this.period.toDate).format('DD MMM YYYY');

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
  	// this.navCtrl.setRoot(AvaPeriodPage); 
  }

  // set date for start and end
  setDate(when) {
    const options = {
      title: 'Start Date',
      canBackwardsSelected: true,
      // color: 'cal-color',
      color: 'secondary'
      // doneIcon: true,
      // closeIcon: true
    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss(date => {
      if (date != null) {
        // console.log(date.string);
        // this.startday=date.string;
        if (when == 'start') {
          this.fromDate=moment(date.string).format('DD MMM YYYY');
        } else if (when == 'end') {
          this.toDate=moment(date.string).format('DD MMM YYYY');
        } else {
          console.log("start or end problem in add period setDate");
        }
        
      }
    })
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
