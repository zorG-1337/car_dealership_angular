import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { HeaderComponent } from '../header/header.component';
import { TestdriveService } from '../../services/testdrive.service';
import { NgFor, NgIf } from '@angular/common';
import { CarsService } from '../../services/cars.service';
import { ProfileService } from '../../services/profile.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-test-drive-requests',
  standalone: true,
  imports: [MatTableModule, HeaderComponent, NgFor, MatMenuModule, MatButtonModule, MatSelectModule
    ,MatInputModule, MatFormFieldModule, NgIf
  ],
  templateUrl: './test-drive-requests.component.html',
  styleUrl: './test-drive-requests.component.css'
})
export class TestDriveRequestsComponent implements OnInit {

  constructor(private TestDrive: TestdriveService, private car: CarsService, private profile: ProfileService, private router: ActivatedRoute) {}

  signUps!: Array<any>
  cars: Array<any> = []
  users: Array<any> = []
  dataSrc: Array<Object[]> = []
  status!: string
  ngOnInit(): void {
      console.log(this.dataSrc)
    
      this.TestDrive.getAllSignUps().subscribe(data => {
        this.signUps = data
        let signUpss = data
        let temp = []
        
        for(let i = 0; i < signUpss.length; i++) {
          temp.push([signUpss[i]])
        }

        for(let i = 0; i < signUpss.length; i++) {
          const signUp = signUpss[i]
          this.car.getCarById({id: signUp.carId}).subscribe(res => {
            temp[i].push(res)
          })
        }

        for(let i = 0; i < signUpss.length; i++) {
          const signUp = signUpss[i]
          this.profile.getUserById({id: signUp.userId}).subscribe(res => {
            temp[i].push(res)
          })
        }

        this.dataSrc = temp
        console.log(this.dataSrc)
      })
      
  }

  getData() {
  
   return this.dataSrc
  }

  updateStatus(id: any) {
    const data = {
      status: this.status,
      id: id
    }

    if(this.status !== undefined) {
      this.TestDrive.updateUsersSignUpStatus(data).subscribe(res => {
        console.log(res)
        location.reload();
      })
    }

  }

  changeClient(value: any) {
    this.status = value
}

  displayedColumns: string[] = ['Name', 'Surname', 'Phone_Number', 'Car_Brand', 'Car_Model', 'Date', 'Status', 'Change_Status'];
}
