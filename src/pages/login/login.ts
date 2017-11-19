import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import { RegisterForm  } from '../register/register';
import * as DomTools from '../../scripts/DOM/dom.tools';

@Component
({
  selector: '<login-form></login-form>',
  templateUrl: './login.html'
})

export class LoginForm
{
    notFound: boolean = false;
    searching: boolean = false;
    error: boolean = false;
    viewPass: boolean = false;
    onPass = false;
    host: string = '@ucol.mx';
    correo: string = '';
    contra: string = '';

    constructor(private loginService: LoginService, private alertasService: AlertController, private navCtrl: NavController) {}

    volver()
    {
      this.navCtrl.pop();
    }

    isCorreo( e : string )
    {
      return DomTools.TryMail(e)
    }

    isContra( e : string )
    {
      return DomTools.TryPassword(e)
    }
        exists()
    {
      this.notFound = false;
      this.error = false;
      this.searching = true;
      this.onPass = false;

      this.loginService.exists( { us_correo: this.correo + this.host }
      , succ =>
      {
        if(succ.status)
        {
          if(succ.data.length == 0)
          {
            this.notFound = true;
          }
          else
          {
            this.onPass = true;
          }
        }
        else
        {
          this.error = true;
        }
        this.searching = false;
      }
      , err =>
      {
        this.error = true;
        this.searching = false;
      })
    }

    reset()
    {
      this.error = false;
      this.notFound = false;
    }

    register()
    {
      this.navCtrl.push(RegisterForm);
    }

    login()
    {
      this.notFound = false;
      this.error = false;
      this.searching = true;

      this.loginService.login( { us_correo : this.correo + this.host , us_contrasena: this.contra }
        , succ =>
        {
          if(succ.status)
          {
            let d = succ.data;

            if(d.autorizado)
            {
              console.log('así nomas');
            }
            else
            {
              this.notFound = true;
            }
          }
          else
          {
            this.error = true;
          }

          this.searching = false;
        }
        , fail =>
        {
          this.searching = false;
          this.error = true;
        })
    }
}


// this.alertasService.create({
//   title: 'Error',
//   subTitle: 'Proporciona datos reales.',
//   buttons: ['OK']
// })
//   .present();
