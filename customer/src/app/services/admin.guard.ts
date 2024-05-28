import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class DefinerR {
  constructor(public router: Router, public auth: AuthService, public profile: ProfileService) {}
}

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
  ,state: RouterStateSnapshot
) => {
  const definerClass = inject(DefinerR);

  if(definerClass.auth.isAuthenticated() && definerClass.profile.parseJwt(definerClass.auth.getToken())?.email === 'admin123@mail.ru') {
    return true
  }
  else {
    definerClass.router.navigate(['profile'])
    return false
  }
};
