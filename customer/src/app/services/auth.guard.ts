import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class Definer {
  constructor(public router: Router, public auth: AuthService) {}
}
export const profileGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  const definerClass = inject(Definer);

  if(definerClass.auth.isAuthenticated())
    return true;

  else {
    definerClass.router.navigate(['login'])
    return false
  }
};
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {
  const definerClass = inject(Definer);

  if(definerClass.auth.isAuthenticated()) {
    definerClass.router.navigate(['profile'])
    return false
  }
  return true
};


