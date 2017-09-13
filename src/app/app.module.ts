import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AvaPeriodPage } from '../pages/ava-period/ava-period';
import { AddPeriodPage } from '../pages/add-period/add-period';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { AdminPagePage } from '../pages/admin-page/admin-page';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AvaPeriodPage,
    AddPeriodPage,
    ProfilePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    AdminPagePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    AdminPagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}