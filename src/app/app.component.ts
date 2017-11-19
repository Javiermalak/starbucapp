import { Component, AfterViewInit , ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { RegisterForm } from '../pages/register/register';
import { LoginForm } from '../pages/login/login';
import { StartPage } from '../pages/start/start';

@Component({
  templateUrl: 'app.html'
})

export class MyApp implements AfterViewInit {

  rootPage:any = StartPage;

  @ViewChild(Nav) nav: Nav;

  ngAfterViewInit()
  {
    this.nav.viewWillEnter.subscribe( data =>
    {
      console.log('Entrando: ' + data.component.name);
    })

    this.nav.viewWillLeave.subscribe( data =>
    {
        console.log('Saliendo: ' + data.component.name);
    })
  }

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

