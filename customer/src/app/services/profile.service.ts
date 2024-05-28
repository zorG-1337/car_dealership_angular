import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Buffer } from 'buffer';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileService{
  constructor(private http: HttpClient, private auth: AuthService ) { }
  userInfo!: any;
  url_user_info: string = "http://localhost:5000/api/user_info/info";
  update_user_info_url: string = "http://localhost:5000/api/update/update_user_info"
  update_user_image_url: string = "http://localhost:5000/api/update/update_user_image"
  add_car_to_user_cart: string = "http://localhost:5000/api/cars/add_car_to_cart"
  get_user_cart: string = "http://localhost:5000/api/user_info/get_cart"
  delete_record_from_cart: string = "http://localhost:5000/api/user_info/delete_from_cart"
  get_user_by_id: string = "http://localhost:5000/api/user_info/get_info_by_id"
  update_balance_url: string = "http://localhost:5000/api/update/update_balance"
  update_password_url: string = 'http://localhost:5000/api/update/update_password'
  parseJwt (token: any) {
    if(typeof(token) === 'string')
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }
  getUserInfo(email: Object): Observable<Object>{
    return this.http.post<Object>(this.url_user_info, email)
  }
  updateUserInfo(customerInfo: Object): Observable<any> {
    return this.http.put<Object>(this.update_user_info_url, customerInfo)
  }
  updateUserImage(data: FormData): Observable<any> {
    return this.http.put<FormData>(this.update_user_image_url, data)
  }
  addCarToCart(data: any): Observable<any> {
    return this.http.post<any>(this.add_car_to_user_cart, data)
  }
  getUserCart(email: any): Observable<any> {
    return this.http.post(this.get_user_cart, email)
  }
  deleteRecordFromCart(data: any): Observable<any> {
    return this.http.post(this.delete_record_from_cart, data)
  }

  getUserById(id: any): Observable<any> {
    return this.http.post(this.get_user_by_id, id)
  }

  updateBalance(data: any): Observable<any> {
    return this.http.post(this.update_balance_url, data)
  }

  updatePassword(data: any): Observable<any> {
    return this.http.post(this.update_password_url, data)
  }
}

  


