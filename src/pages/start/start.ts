import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginForm } from '../login/login';
import { RegisterForm } from '../register/register';
import { OnInit } from '@angular/core';
import { Manipulate } from '../../scripts/DOM/dom.tools';

@Component({
  templateUrl: './start.html',
  selector: '<start></start>'
})

export class StartPage {

  constructor(private navCtrl: NavController) { }

  register()
  {
    Manipulate( document.getElementById('signup'),'bounceOutUp', 500 ,() => this.navCtrl.push(RegisterForm) )
  }

  login()
  {
    Manipulate( document.getElementById('login'),'bounceOutDown', 500 ,() => this.navCtrl.push(LoginForm) )
  }
}
