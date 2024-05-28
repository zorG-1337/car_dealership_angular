import { Component, Host, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import {MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CreateCarDialogComponent } from '../create-car-dialog/create-car-dialog.component';
import { CarsService } from '../../services/cars.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TestdriveComponent } from '../testdrive/testdrive.component';
import { TestdriveService } from '../../services/testdrive.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [HeaderComponent, MatFormFieldModule, MatInputModule, MatSelectModule,
     MatButtonModule, MatDividerModule, MatIconModule, NgFor, MatDialogModule, FormsModule, MatFormFieldModule, ReactiveFormsModule,
    NgIf, RouterLink],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent implements OnInit{
  constructor(private profile : ProfileService, private auth: AuthService, public dialog: MatDialog,
    private cars: CarsService, private TestDrive: TestdriveService, private _snackBar: MatSnackBar
  ) {
  }
  isHidden!: boolean
  NoLogin!: boolean
  brand: string | null = null
  foundCars: any = []
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  myForm: FormGroup = new FormGroup({
    brand: new FormControl(null),
    model: new FormControl(null),
    color: new FormControl(null),
    drive: new FormControl(null),
    rudder: new FormControl(null),
    priceFrom: new FormControl(null),
    priceTo: new FormControl(null)
  })
  ngOnInit(): void {
      let email:any = this.profile.parseJwt(this.auth.getToken())?.email
      this.isHidden = email !== 'admin123@mail.ru'
      this.NoLogin = email === undefined
  }
  changeClient(value: any) {
    this.brand = value
    console.log(this.brand)
}
  getBrand() {
    return this.brand
  }
  getCarsByBrand() {
    if(this.getBrand() === 'BMW') {
      return ['X5', 'X6']
    }
    if(this.getBrand() === 'Toyota') {
      return ['Supra', 'rav4']
    }
    if(this.getBrand() === 'Mercedes') {
      return ['G-Class', 'B-Class', 'C-Class']
    }
    if(this.getBrand() === 'Audi') {
      return ['Q6', 'Q5']
    }
    if(this.getBrand() === 'VAZ')
      return ['2107','2110']
    return []
  }
  openDialog(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    const dialogRef = this.dialog.open(CreateCarDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(typeof(result) !== 'boolean') {
        this.cars.createCar(result).subscribe(result => {
          console.log(result)
        })
      }
    })
  }
  openDialogTestDrive(id: any) {
    let dialogConfigTestDrive = new MatDialogConfig();
    dialogConfigTestDrive.disableClose = true
    dialogConfigTestDrive.width = '450px'
    const dialogRef = this.dialog.open(TestdriveComponent, dialogConfigTestDrive);
    dialogRef.afterClosed().subscribe(result => {
      if(result && result.date) {
        const request = result
        request.userId = this.profile.parseJwt(this.auth.getToken())?.user_id
        request.carId = id
        request.date = new Date(result.date.getTime() - result.date.getTimezoneOffset()*60*1000);

        this.TestDrive.signUpForTestDrive(request).subscribe(res => {
          this._snackBar.open('You have signed up for test drive', 'Cool!', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        })
      }
      
    })
  }
  searchCars() {
    let obj = {
      brand: this.myForm.value.brand,
      model: this.myForm.value.model,
      color: this.myForm.value.color,
      yearOfRelease:this.myForm.value.yearOfRelease,
      drive: this.myForm.value.drive,
      rudder: this.myForm.value.rudder,
    }
    this.cars.getCars(obj).subscribe(res => {
      this.foundCars = res.request
      console.log(this.foundCars)
    })
  }
  addToUserCart(id: any) {
    this.profile.addCarToCart({
      email: this.profile.parseJwt(this.auth.getToken()).email,
      id: id
    }).subscribe(res => {
      this._snackBar.open('The car was successfully added', 'Cool!', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    })
  }
  deleteCar(id: any) {
    this.cars.deleteCar({id: id}).subscribe(res => {
      console.log(res)
    })
  }
}
