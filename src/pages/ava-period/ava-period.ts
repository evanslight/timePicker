import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';

import { AddPeriodPage } from '../add-period/add-period';
import { EditPeriodPage } from '../edit-period/edit-period';
import { LoginPage } from '../login/login';
import { StaffProvider } from '../../providers/staff/staff';
// import { StaffProvider } from '../../providers/staff/staff';

@Component({
  selector: 'page-ava-period',
  templateUrl: 'ava-period.html'
})
export class AvaPeriodPage {
  items: any;
  // length: any;

  userInfor: any;
  originalItems: any[];
  taskList: any[] = [];
  item: any;

  approve: number=0;
  rejected:number=0;
  pending: number=0;

  constructor(public navCtrl: NavController, private sp: StaffProvider, private modalCtrl:ModalController) {
    // this.initializeItems()
    // this.sp.initializeData()
    // login.ts goToAvaPeriod set item
    // console.log('ava-period item ->', navParams.get('item'));
    // this.item=navParams.get('item');
    // this.getTasks();
    // for (let task in this.sp.retrieveTasklist()) {    
    //   console.log("AvaPeriodPage->>>"+task)
    // }
    // this.taskList=this.sp.retrieveTasklist();
    // console.log("tasklist is: "+this.taskList);
  	// this.navCtrl.setRoot(AvaPeriodPage);
    this.sp.retrieve().subscribe(profile => {
      // console.log("profile.name -> "+profile.val());
      this.userInfor=profile.val()
      // console.log(this.userInfor);
      // push into task list to iterate in web
      // this.length=Object.keys(this.userInfor.tasks).length;

      for (let taskID in this.userInfor.tasks) {
        if( this.userInfor.tasks[taskID].status == 'rejected') {
          this.rejected += 1

        } else if (this.userInfor.tasks[taskID].status == 'approve') {
          this.approve += 1
        } else if (this.userInfor.tasks[taskID].status == 'pending') {
          this.pending += 1
        } else {
          console.log("counting error in ava-period")
        }
        // var tempDate = new Date(this.item.tasks[task].toDate);
        // if (this.today <= tempDate) {
        //   this.taskList.push(this.item.tasks[task]);
        // }
        this.taskList.push({key:taskID, value:this.userInfor.tasks[taskID]});

        // console.log('ava-period task is ', this.item.tasks[task]);
        // console.log('ava-period taskid is ', task);
      }

      // this.name=this.userInforStaff.name
    });

  }


  // getTasks() {
  //   // console.log('ava-period name is ', this.item);
  //   for (let task in this.item.tasks) {
  //     // var tempDate = new Date(this.item.tasks[task].toDate);
  //     // if (this.today <= tempDate) {
  //     //   this.taskList.push(this.item.tasks[task]);
  //     // }
  //     this.taskList.push(this.item.tasks[task]);
  //     // console.log('ava-period task is ', this.item.tasks[task]);
  //     // console.log('ava-period taskid is ', task);
  //   }
  // }


  goToAddPeriod(params){
    if (!params) params = {};
    this.navCtrl.push(AddPeriodPage);
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

  // getItems(ev: any) {
  //   // Reset items back to all of the items
  //   // this.initializeItems();
  // // this.items = this.sp.namelist;
  //   this.items=this.originalItems;
  //   // console.log("the item in getItem is->"+this.items);
  //   // set val to the value of the searchbar
  //   let val = ev.target.value;
  //   var temp = []
       

  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     // this.items = this.items.filter((item) => {
  //     //   return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     // })

  //     this.items.forEach((item) => {
  //       // key will be "ada" the first time and "alan" the second time
  //       if (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ){
  //         temp.push(item);
  //         console.log("temp in getItems is: "+temp);
  //       }
  
  //       // childData will be the actual contents of the child
  //       // var childData = childSnapshot.val();
  //       // this.items.push(childSnapshot.val())
  //     });
  //     this.items=temp;

  //   }
  // }

  edit(taskKey,period){
    // this.openPage(AddPeriodPage);
    if (period.status == "pending") {
      console.log("ava-period taskKey is "+taskKey)
      this.presentProfileModal(taskKey,period);
    } else {
      this.sp.presentToast("You can only modify pending period")
    }
    
  }

  delete(taskKey,status){
    if(status != "approve") {
      this.sp.removeTask(taskKey);
      this.navCtrl.setRoot(this.navCtrl.getActive().component);  
    } else {
      this.sp.presentToast("You cannot delete approved period")
    }

  }

  private presentProfileModal(taskKey,period) {
    let profileModal = this.modalCtrl.create(EditPeriodPage, { taskKey: taskKey, period: period });
    profileModal.present();
  }

}

