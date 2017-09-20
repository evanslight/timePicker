import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController,ModalController  } from 'ionic-angular';
import { AvaPeriodPage } from '../ava-period/ava-period';
import { Calendar } from '@ionic-native/calendar';
import { StaffProvider } from '../../providers/staff/staff';
import * as moment from 'moment';

import {
  CalendarModalOptions,
  CalendarModal,
  DayConfig
} from 'ion2-calendar'

@Component({
  selector: 'page-add-period',
  templateUrl: 'add-period.html'
})
export class AddPeriodPage {

  // constructor(public navCtrl: NavController) {
  // }
  // goToAvaPeriod(params){
  //   if (!params) params = {};
  //   this.navCtrl.push(AvaPeriodPage);
  //   this.navCtrl.setRoot(AvaPeriodPage);
  //   // this.navCtrl.push(AvaPeriodPage);
  // }

  today = new Date();
  dd = this.today.getDate();
  mm = this.today.getMonth()+1; //January is 0!
  yyyy = this.today.getFullYear();
  newmm = "";
  thisday = "";
  newdd = "";
  startday = "";
  endday = "";



  constructor(public navCtrl: NavController, private calendar: Calendar, private sp: StaffProvider, public loadingCtrl: LoadingController,public modalCtrl: ModalController, private alertCtrl: AlertController) {
      // this.calendar.createCalendar('MyCalendar').then(
      //   (msg) => { console.log(msg); },
      //   (err) => { console.log(err); }
      // );

      //deal with date number smaller than 10
      if ( this.mm < 10) {
        this.newmm = ('0'+this.mm).toString();
      } else {
        this.newmm = this.mm.toString();
      }

      if ( this.dd < 10) {
        this.newdd = ('0'+this.dd).toString();
      } else {
        this.newdd = this.dd.toString();
      }
      this.thisday = (this.yyyy+'-'+this.newmm+'-'+this.newdd).toString();
      this.startday = moment(this.thisday).format('DD MMM YYYY');
      this.endday = moment(this.thisday).format('DD MMM YYYY');
  }

  public event = {
    month: this.thisday,
    timeEnds: '2017-09-06',
    timeStarts: '09:00',
    timeEnd: '17:00',
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
          this.startday=moment(date.string).format('DD MMM YYYY');
        } else if (when == 'end') {
          this.endday=moment(date.string).format('DD MMM YYYY');
        } else {
          console.log("start or end problem in add period setDate");
        }
        
      }
    })
  }

  submitdata(start, end, timebegin, timeend){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    timebegin=this.event.timeStarts;
    timeend=this.event.timeEnd;
    console.log(start +" "+ end +" "+timebegin + " "+timeend);
    this.sp.updateUserTask(start, end, timebegin, timeend);
    loading.dismiss();
  }

  presentConfirm(startday, endday, timebegin, timeend) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Period',
      message: 'Do you want to submit this period?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: () => {
            this.submitdata(startday, endday, timebegin, timeend)
            console.log('submited');
            this.navCtrl.pop();
            this.navCtrl.setRoot(AvaPeriodPage); 
            // this.sp.retrieveTasklist("task");
          }
        }
      ]
    });
    alert.present();
  }


  ionViewDidLoad(thisday) {
    thisday=this.startday;
  console.log(thisday);

  }

  onChange($event) {
    console.log($event);
  }

  // goToDetailPage() {
  //   this.navCtrl.push(AvaPeriodPage);
  // }




}
