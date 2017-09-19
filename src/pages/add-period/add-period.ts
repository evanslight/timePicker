import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController  } from 'ionic-angular';
import { AvaPeriodPage } from '../ava-period/ava-period';
import { Calendar } from '@ionic-native/calendar';
import { StaffProvider } from '../../providers/staff/staff';

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



  constructor(public navCtrl: NavController, private calendar: Calendar, private sp: StaffProvider, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
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
      this.startday = this.thisday;
      this.endday = this.thisday;
  }

  public event = {
    month: this.thisday,
    timeEnds: '2017-09-06',
    timeStarts: '09:00',
    timeEnd: '17:00',
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

  // goToDetailPage() {
  //   this.navCtrl.push(AvaPeriodPage);
  // }




}
