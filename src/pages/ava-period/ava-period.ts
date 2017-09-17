import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddPeriodPage } from '../add-period/add-period';
import { LoginPage } from '../login/login';
// import { StaffProvider } from '../../providers/staff/staff';

@Component({
  selector: 'page-ava-period',
  templateUrl: 'ava-period.html'
})
export class AvaPeriodPage {
  items: any;
  originalItems: any[];
  taskList: any[] = [];
  item: any;

  constructor(public navCtrl: NavController,  public navParams: NavParams) {
    // this.initializeItems()
    // this.sp.initializeData()
    // login.ts goToAvaPeriod set item
    console.log('ava-period item ->', navParams.get('item'));
    this.item=navParams.get('item');
    this.getTasks();
    // for (let task in this.sp.retrieveTasklist()) {    
    //   console.log("AvaPeriodPage->>>"+task)
    // }
    // this.taskList=this.sp.retrieveTasklist();
    // console.log("tasklist is: "+this.taskList);
  	// this.navCtrl.setRoot(AvaPeriodPage);
  }

  // gettaskList(): any {
  //   for (let task in this.items.name) {    
  //     console.log("AvaPeriodPage->>>"+task)
  //   }
  //   return ""
  // }
  
  // initializeItems() {

  //       this.items = this.sp.initializeData();
  //       this.originalItems=this.items;

  //   // this.items = [
  //   //   'Amsterdam',
  //   //   'Bogota',
  //   // ]
  // }
  getTasks() {
    // console.log('ava-period name is ', this.item);
    for (let task in this.item.tasks) {
      // var tempDate = new Date(this.item.tasks[task].toDate);
      // if (this.today <= tempDate) {
      //   this.taskList.push(this.item.tasks[task]);
      // }
      this.taskList.push(this.item.tasks[task]);
      console.log('ava-period task is ', this.item.tasks[task]);
      console.log('ava-period taskid is ', task);
    }
  }


  // initializeItems() {
  //   // this.sp.getAllUser().then((value) => {
  //   //   console.log("->"+value);
  //   // })

  // // this.items = this.sp.getAllUser;

  //   this.sp.Send().subscribe( usernames => {
  //       console.log("lalala");
  //       console.log(usernames);

  //       var temp = []
  //       usernames.forEach(lalala => {
  //          console.log(lalala.val());
  //          temp.push(lalala.val())

  //       })
  //       // console.log("the temp is "+temp);
  //       this.items = temp;
  //       this.originalItems=this.items;
  // });

  //   // this.items = [
  //   //   'Amsterdam',
  //   //   'Bogota',
  //   // ]
  // }
  goToAddPeriod(params){
    if (!params) params = {};
    this.navCtrl.push(AddPeriodPage);
  }

  openPage(page) {
    this.navCtrl.push(page);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // this.initializeItems();
  // this.items = this.sp.namelist;
    this.items=this.originalItems;
    // console.log("the item in getItem is->"+this.items);
    // set val to the value of the searchbar
    let val = ev.target.value;
    var temp = []
       

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // this.items = this.items.filter((item) => {
      //   return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })

      this.items.forEach((item) => {
        // key will be "ada" the first time and "alan" the second time
        if (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ){
          temp.push(item);
          console.log("temp in getItems is: "+temp);
        }
  
        // childData will be the actual contents of the child
        // var childData = childSnapshot.val();
        // this.items.push(childSnapshot.val())
      });
      this.items=temp;

    }
  }
}
