import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { RegisterService } from "../../services/register.service";
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import * as Scripts from '../../scripts/DOM/dom.tools';

@Component
({
  selector: '<register-form></register-form>',
  templateUrl: './register.html'
})

export class RegisterForm
{
  Form: FormGroup;
  error: boolean;
  trying: boolean;
  host: string = '@ucol.mx';
  data: object;
  planteles: object;

    constructor(private navCtrl: NavController, private registerService: RegisterService, private fb: FormBuilder)
    {
      this.Form = fb.group({
        nombre:  [ "", Validators.required ],
        apellido:  [ "", Validators.required ],
        contra:  [ "", Validators.compose([Validators.required, Validators.minLength(6)])],
        correo:  [ "", [Validators.required,Validators.pattern(/^\S*$/)]],
        plantel: ['', Validators.required]
      });

      this.registerService.GetFacultades(
      res =>
      {
        if(res.status)
        {
          this.planteles = res.data;
        }
        else
        {
          this.planteles = [];
        }
      }
      , err =>
      {
        this.planteles = [];
      })

      this.data =
      {
        'us_nombre': '',
        'us_correo': '',
        'us_contrasena': '',
        'us_plantel': '',
        'us_tipo_usuario': 1
      }
    }

    volver()
    {
      this.navCtrl.pop();
    }

    testM()
    {
      return Scripts.TryMail(this.Form.value.correo)
    }

    testP()
    {
      return Scripts.TryPassword(this.Form.value.contra);
    }

    registrar()
    {
      let vals = this.Form.value;

      this.error = false;
      this.trying = true;

      this.data['us_nombre'] = vals.nombre.trim() + ' ' + vals.apellido.trim();
      this.data['us_correo'] = vals.correo + this.host;
      this.data['us_contrasena'] = vals.contra;
      this.data['us_plantel'] = vals.plantel;


      this.registerService.Register( this.data
      , res =>
      {
        let resultado: any;

        if( res.status )
        {
          this.data = resultado = res.data;

          console.log('Nuevo usuario', resultado);
        }
        else
        {
          resultado = res.message;

          this.error = true;

          console.log('Error agregando al nuevo usuario', resultado);
        }

        this.trying = false;
      }
      , ex =>
      {
        this.trying = false;
        this.error = true;

        console.log('Error', ex);
      });
    }
}
