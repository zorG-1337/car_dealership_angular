import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoughtcarsService {

  constructor(private http: HttpClient, profile: ProfileService, private auth: AuthService) { }

  add_new_bought_car: string = 'http://localhost:5000/api/bought_cars/add_new_bought_car'
  get_all_users_purchases: string = 'http://localhost:5000/api/bought_cars/get_all_users_purchases'
  get_all_purchases: string = 'http://localhost:5000/api/bought_cars/get_all_purchases'
  addNewBoughtCar(data: any) : Observable<any> {
    return this.http.post(this.add_new_bought_car, data)
  }

  getAllUsersPurchases(id: any) : Observable<any> {
    return this.http.post(this.get_all_users_purchases, id)
  }

  getAllPurchase() : Observable<any> {
    return this.http.get(this.get_all_purchases)
  }
}
