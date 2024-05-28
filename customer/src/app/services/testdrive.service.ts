import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestdriveService {

  constructor(private http: HttpClient) { }

  signUpForTestDriveLink: string = 'http://localhost:5000/api/testdrive/signUpForTestDrive'
  getAllSignUpsLink: string = 'http://localhost:5000/api/testdrive/getAllSignUps'
  updateUsersSignUpStatusLink: string = 'http://localhost:5000/api/testdrive/updateUsersSignUpStatus'
  getAllUserSignUpsLink: string = "http://localhost:5000/api/testdrive/get_all_user_sign_ups"
  signUpForTestDrive(data: any): Observable<any> {
    return this.http.post(this.signUpForTestDriveLink, data)
  }

  getAllSignUps(): Observable<any> {
     return this.http.get(this.getAllSignUpsLink)
  }

  updateUsersSignUpStatus(data: any) : Observable<any> {
    return this.http.post(this.updateUsersSignUpStatusLink, data)
  }

  getAllUserSignUps(data: any): Observable<any> {
    return this.http.post(this.getAllUserSignUpsLink, data)
  }
}
