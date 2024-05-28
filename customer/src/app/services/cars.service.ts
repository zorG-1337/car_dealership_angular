import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarsService {
  constructor(private http: HttpClient) { }
  create_cars_url: string = "http://localhost:5000/api/cars/create_car"
  get_cars_url: string = "http://localhost:5000/api/cars/find_cars"
  delete_car_url: string = "http://localhost:5000/api/cars/delete_car"
  get_car_by_id_url: string = "http://localhost:5000/api/cars/find_car_by_id"
  createCar(formData: FormData): Observable<Object> {
    return this.http.post<FormData>(this.create_cars_url, formData)
  }
  getCars(data: any): Observable<any> {
    return this.http.post<any>(this.get_cars_url, data)
  }
  deleteCar(id: any) {
    return this.http.post<any>(this.delete_car_url, id)
  }

  getCarById(id: any) {
    return this.http.post<any>(this.get_car_by_id_url, id)
  }
}
