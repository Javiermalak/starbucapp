import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

@Injectable()

export class RegisterService
{
  private base:string = 'https://starbucapi.herokuapp.com/';
  private baseL:string = 'http://localhost:1337/';

  constructor( private http : Http ) {}

  Register( data : any , cb : ( e : any ) => any | void , fb : ( e : any ) => any | void )
  {
    this.http.post( this.base + 'usuario' , data)
      .map( el => el.json() )
      .subscribe( res => cb(res) , err => fb(err) )
  }

  GetFacultades( cb: ( e : any ) => void | any, fb : ( e : any ) => void | any )
  {
    this.http.get( this.base + 'planteles')
      .map( e => e.json())
      .subscribe( res => cb(res) , err => fb(err) )
  }
}

