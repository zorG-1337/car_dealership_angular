import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { customer } from '../models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url_register: string = 'http://localhost:5000/api/auth/register';
  url_login: string = 'http://localhost:5000/api/auth/login'
  constructor(private http: HttpClient) { }
  registerCustomer(customerInfo: customer):Observable<any> {
    return this.http.post<Object>(this.url_register, customerInfo);
  }
  loginCustomer(customerInfo: Object): Observable<any>{
    return this.http.post<Object>(this.url_login, customerInfo);
  }
  isAuthenticated() {
    if(typeof window !== 'undefined'){
      // now access your localStorage
      return localStorage.length !== 0
    }
    return false
  }
  setToken(token: string) {
    localStorage.setItem('token', token)
  }
  delToken() {
    localStorage.clear()
  }
  Logout() {
    this.delToken()
  }
  getToken(){
    if(this.isAuthenticated()) {
      return localStorage.getItem('token') as string
    }
    return false
  }
}
