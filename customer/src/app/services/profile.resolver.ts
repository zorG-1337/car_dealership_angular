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
import { Injectable, OnInit, inject } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class Declarations{
  constructor(private profile: ProfileService, private auth: AuthService) {}

  getInfo() {
    return this.profile.getUserInfo({email: this.profile.parseJwt(this.auth.getToken()).email})
  }
}

export const profileResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot
  ,state: RouterStateSnapshot
) => {

  let declarations = inject(Declarations)
  

  return declarations.getInfo()
};
