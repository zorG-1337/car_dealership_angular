import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Injectable, OnInit, inject } from '@angular/core';
import { TestdriveService } from './testdrive.service';
import { CarsService } from './cars.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})

export class Declrs{
  constructor(public TestDrive: TestdriveService, public cars: CarsService, public profile: ProfileService) {}
  data: Array<Object[]> = []
  signUps: Array<any> = []
  car: Array<any> = []
  user: Array<any> = []
}

export const testdriverequestsResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot
  , state: RouterStateSnapshot
) => {
  let declrs = inject(Declrs)
  return [[1, 2, 3], [1, 2, 3]]
};
