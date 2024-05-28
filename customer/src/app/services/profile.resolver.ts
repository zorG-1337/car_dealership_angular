/*import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ProfileService } from './profile.service';
import { AuthService } from './auth.service';
import { EMPTY, delay, of } from 'rxjs';


export const profileResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot
  ,state: RouterStateSnapshot
) => {

  return {
    message: "GO FUCK YOURSELF"
  }
  
    
};

*/

import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class Declarations {
  constructor(public profile: ProfileService, public auth: AuthService) {}

  info: any
}

export const profileResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot
  ,state: RouterStateSnapshot
) => {

  let declarations = inject(Declarations)
  
  declarations.profile.getUserInfo({email: declarations.profile.parseJwt(declarations.auth.getToken()).email}).subscribe((data) => { 
    declarations.info = data
  })

  return declarations.info
};
