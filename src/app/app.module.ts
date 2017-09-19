import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler,LoadingController, ModalController,NavController,ToastController  } from 'ionic-angular';

import { MyApp } from './app.component';
import { AvaPeriodPage } from '../pages/ava-period/ava-period';
import { AddPeriodPage } from '../pages/add-period/add-period';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
// import { AdminPagePage } from '../pages/admin-page/admin-page';
import { EditPeriodPage } from '../pages/edit-period/edit-period';
import { StaffProvider } from '../providers/staff/staff';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Calendar } from '@ionic-native/calendar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyCVpAFXwbvElEjiC9iw3S9RtLaoVgIkloM",
    authDomain: "calendar-auth-ee4d8.firebaseapp.com",
    databaseURL: "https://calendar-auth-ee4d8.firebaseio.com",
    projectId: "calendar-auth-ee4d8",
    storageBucket: "calendar-auth-ee4d8.appspot.com",
    messagingSenderId: "59076430653"
};

@NgModule({
  declarations: [
    MyApp,
    AvaPeriodPage,
    AddPeriodPage,
    ProfilePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    EditPeriodPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AvaPeriodPage,
    AddPeriodPage,
    ProfilePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    EditPeriodPage
  ],
  providers: [
    Calendar,
    StatusBar,
    SplashScreen,
    ModalController,
    AngularFireModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StaffProvider
  ]
})
export class AppModule {}