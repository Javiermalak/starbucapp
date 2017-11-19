import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable()

export class LoginService
{

  private base:string = 'https://starbucapi.herokuapp.com/';
  private baseL:string = 'http://localhost:1337/';

  constructor (private http:Http) { }

  exists(body: any , success: (p: any) => any | void , fail: (p: any) => any | void )
  {
    this.http.get(this.base + 'usuarios?us_correo='+ body.us_correo)
      .map( el => el.json() )
      .subscribe( res => success(res), err => fail(err) )
  }

  login(body: any , success: (p: any) => any | void , fail: (p: any) => any | void )
  {
    this.http.post(this.base + 'autenticar', body)
      .map( el => el.json() )
      .subscribe( res => success(res) , err => fail(err) )
  }
}
