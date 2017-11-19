import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { LoginForm } from '../pages/login/login';
import { RegisterForm } from '../pages/register/register';
import { StartPage } from '../pages/start/start';

import { LoginService } from '../services/login.service';
import { RegisterService } from '../services/register.service';

@NgModule({
  declarations: [
    StartPage,
    MyApp,
    LoginForm,
    RegisterForm
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    LoginForm,
    RegisterForm
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginService,
    RegisterService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
