import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { TestdriveService } from '../../services/testdrive.service';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { CarsService } from '../../services/cars.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-mytestdrives',
  standalone: true,
  imports: [HeaderComponent, NgFor, NgIf],
  templateUrl: './mytestdrives.component.html',
  styleUrl: './mytestdrives.component.css'
})
export class MytestdrivesComponent implements OnInit{
  constructor(private TestDrive: TestdriveService, private profile: ProfileService, 
    private auth: AuthService, private cars: CarsService) {}

  car: Array<any> = []

    ngOnInit(): void {
      const userId = this.profile.parseJwt(this.auth.getToken())?.user_id
      this.TestDrive.getAllUserSignUps({userId: userId}).subscribe(res => {
        const response = res
        for(let i = 0; i< response.length; i++) {
          this.cars.getCarById({id: response[i].carId}).subscribe(data => {
            this.car.push([data, response[i].status, response[i].date])
          })
        }
      })
    }

  getAllSignUps() {
    return this.car
  }
}
