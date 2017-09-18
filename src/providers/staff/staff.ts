import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ToastController, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';

// import { NavController } from 'ionic-angular';

// import { LoginPage } from '../../pages/login/login';
import { AvaPeriodPage } from '../../pages/ava-period/ava-period';
import { ProfilePage } from '../../pages/profile/profile';
// import { AddPeriodPage } from '../../pages/add-period/add-period';
// import { SignupPage } from '../../pages/signup/signup';
// import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
/*
  Generated class for the StaffProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
// Must export the config


@Injectable()
export class StaffProvider {

  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;  
  whichUser: any;


  userInfo: any;
  userInforStaff: any;

  test: any;
  itemsSubscription: any;

  adaRef: any;
  displayName: string = '';

  namelist: any[] = [];
  loadedDetail=false;

  authState: any = null;
  mobile: string ='';

  dict: any[];

  constructor( private app: App, private afAuth: AngularFireAuth,
    private db: AngularFireDatabase, private toastCtrl: ToastController) {

    this.items = db.list('/users', {
      query: {
        limitToLast: 50
      },
      preserveSnapshot: true
    });

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
   
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest'
    } else if (this.currentUserAnonymous) {
      return 'Anonymous'
    } else {
      return this.authState['displayName'] || 'User without a Name'
    }
  }

  // Returns all user name
  get getAllUser():  any {
    const path=`users`;
    var arrayNames = [];
    console.log("->>>getAllUser "+this.loadedDetail);
    this.db.database.ref(path).once("value")
    .then((snapshot) => {
      
      snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        // childData will be the actual contents of the child
        // var childData = childSnapshot.val();
        // this.items.push(childSnapshot.val())
        arrayNames.push(childSnapshot.val().name);
  
        // console.log("->>>"+arrayNames);
    })
      this.loadedDetail=true;
      console.log("->>>getAllUser "+this.loadedDetail);
      // console.log("->>>"+this.loadedDetail);
      this.namelist=arrayNames
      return arrayNames
   })
    return ""
  }

  Send() {
    return this.items
  }

  //// Email/Password Auth ////
  initializeData(): any {
    var temp = []
    this.itemsSubscription=this.items.subscribe( usernames => {
      const path = `users/${this.currentUserId}`;
      this.adaRef = firebase.database().ref(path);
      this.adaRef.once('value').then((snapshot)=> {
          temp=snapshot.val()
      })
    // console.log("lalala");
    // console.log(usernames);

    
    // usernames.forEach(lalala => {
    //    // console.log(lalala.val());
    //    temp.push(lalala.val())

    // })
    // console.log("the temp is "+temp);
    return temp;
  });
  }

    // this.items = [
    //   'Amsterdam',
    //   'Bogota',
    // ]
  // disconnect from subscribe
  readDestroy(){
    this.itemsSubscription.unsubscribe();
  }


  // sign up through email
  emailSignUp(email: string, password: string, name: string, mobile: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.displayName = name
        this.mobile = mobile
        this.updateUserData()
        // console.log("->"+this.displayName)
      })
      .catch(error => {
        if(error.message == "The email address is already in use by another account.") {
          this.presentToast("The email address is already in use")
        } else {
          console.log("sign up error "+error.message)
        }
        
      });
  }

  // login through email
  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
          const path = `users/${this.currentUserId}`;

          this.adaRef = firebase.database().ref(path);
          this.adaRef.once('value').then((snapshot)=> {
            // this.userInfo=snapshot.val()
            this.displayName=snapshot.val().name

            // this.test = snapshot.val().name
            // console.log(",", snapshot.val())
            // this.retrieveTasklist()
            // console.log(this.userInfo)


        });
        // this.updateUserData()
        // this.adaRef = this.adaRef.push();
        // this.adaRef.set({
        //   'name': 'ada'
        // });
          this.whichUser = this.currentUserId;
          // this.userInfo=this.retrieveTasklist(this.whichUser);
          console.log("userid staff login ++" + this.whichUser);
          // console.log("userInfo staff login ++" + this.userInfo);
        // console.log("->"+this.displayName)
      })
      .catch(error => {
        console.log("error ++" + error.message);
        if (error.message == "The password is invalid or the user does not have a password." || error.message == "There is no user record corresponding to this identifier. The user may have been deleted."){
          this.presentToast("The password or user email is invalid")
        } else if ( error.message == "The email address is badly formatted."){
          this.presentToast("The email address is badly formatted")
        } else {
          this.presentToast("Error")
        }

      });
  }

  //retrieve task for ava-period page
  retrieveTasklist(task: string){

    // const path = `users/${userid}`;
    
    // this.adaRef = firebase.database().ref(path);
    // this.adaRef.once('value').then((snapshot)=> {
    //   // return this.userInfo  
    //   this.userInfo=snapshot.val() 
    //   console.log("userinfo is " + this.userInfo);
    // })  
  //   this.items.subscribe( userinfos => {

  //       var temp = []
  //       userinfos.forEach(userinfo => {
          
  //         if (userinfo.key == userid) {
  //           this.userInfo = userinfo.val()
  //           console.log("get user key id -> " +this.userInfo);
  //           return this.userInfo

  //         } else {
  //           return ""
  //         }
  //         // if (userinfo.key == )
  //         //  console.log(lalala.val());
  //         //  temp.push(lalala.val())

  //       })
  //       // console.log("the temp is "+temp);
  //       // this.items = temp;
  //       // this.originalItems=this.items;
  // });

          // const path = `users/${this.whichUser}`;
          // firebase.database().ref(path).once('value').then((snapshot)=> {
          //   console.log("staff snapshot.val() "+snapshot.val());
          //   });
    const path = `/users/${this.whichUser}`;
    console.log("staff path "+path);
    this.userInfo = this.db.object(path, {
      preserveSnapshot: true
    });
    console.log("staff userInfo ->"+this.userInfo);
    this.userInfo.subscribe( userInfos => {
    // userInfos.forEach(snapshot => {
    //   console.log("staff userInfo ------->")
    //   console.log(snapshot.key)
    //   console.log(snapshot.val())
    // });


      this.userInforStaff = userInfos.val()
      console.log("staff userInfo ------->")
      console.log(this.userInforStaff);
      // this.navCtrl.setRoot(AvaPeriodPage,{item: this.userInforStaff});
      if (task=="task") {
        this.app.getActiveNav().setRoot(AvaPeriodPage,{item: this.userInforStaff});
      } else if (task=="profile") {
        this.app.getActiveNav().setRoot(ProfilePage,{item: this.userInforStaff, id: this.whichUser});
      } else {
        console.log("error in task and profile switch.")
      }
      

      // return this.userInforStaff;

    },      
    // The 2nd callback handles errors.
    (err) => console.error(err),
    // The 3rd callback handles the "complete" event.
    () => console.log("observable complete")
    )
    // .then(as => { this.navCtrl.setRoot(AvaPeriodPage,{item: this.userInforStaff}) });


  }
  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error))
  }


  //// Sign Out ////

  signOut(): void {
    this.afAuth.auth.signOut();
    // this.router.navigate(['/'])
  }


  //// Helpers ////
  private presentToast(errorMessage:string): void {
    let toast = this.toastCtrl.create({
      message: errorMessage,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const data = {
      email: this.authState.email,
      name: this.displayName,
      mobile: this.mobile,
      role: "staff",
      tasks: []
    }

    this.db.object(path).update(data)
      .catch(error => console.log(error));

  }


  public updateProfile(email,phone): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    const emailPath = `users/${this.currentUserId}/email`; // Endpoint on firebase
    const mobilePath = `users/${this.currentUserId}/mobile`; 
    // const data = {
    //   email: email,
    //   mobile: phone
    // }

    this.db.object(emailPath).update(email)
      .catch(error => console.log(error));

    this.db.object(mobilePath).update(phone)
      .catch(error => console.log(error));
  }

  public updateUserTask(fromDate: string, toDate: string, startTime: string, endTime: string, taskTitle: string, location: string): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    // const path = `users/${this.currentUserId}`; // Endpoint on firebase
    // const data = {
    //   email: this.authState.email,
    //   name: this.displayName,
    //   tasks: [{
    //     "title": taskTitle,
    //     "fromDate": fromDate,
    //     "toDate": toDate,
    //     "startTime": startTime,
    //     "endTime": endTime
    //   }]

    // }

    const path = `users/${this.currentUserId}/tasks`; // Endpoint on firebase
    this.adaRef = firebase.database().ref(path);

    const data = {
        "title": taskTitle,
        "location": location,
        "fromDate": fromDate,
        "toDate": toDate,
        "startTime": startTime,
        "endTime": endTime,
        "status": "pending"
    }

    this.adaRef.push(data)

    // this.db.object(path).update(data)
    //   .catch(error => console.log(error));

  }

  // goToAvaPeriod(params){
  //   if (!params) params = {};
  //   this.navCtrl.setRoot(AvaPeriodPage);
  //   // this.navCtrl.push(AvaPeriodPage);
  // }

// getAllUser():Observable<any> {
//       return new Observable(observer => {
//            firebase.database().ref('users')
//            .limitToLast(10)
//            .once('value',
//                 (snapshot) => {
//                      observer.next(snapshot.val().name);
//                 },
//                 (err) => {
//                      console.log(err);
//                 }
//            );
//       });
//  }

}
