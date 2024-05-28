import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CarsService } from '../../services/cars.service';
import { BoughtcarsService } from '../../services/boughtcars.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent, NgFor, NgIf, MatButtonModule, MatDividerModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
    constructor(private profile : ProfileService, private auth: AuthService, private _snackBar: MatSnackBar,
      private cars: CarsService, private bought_cars: BoughtcarsService
    ) {
    }
    cart: Array<any> = []
    horizontalPosition: MatSnackBarHorizontalPosition = 'start';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';
    user!: any
    ngOnInit(): void {
      this.profile.getUserCart({email: this.profile.parseJwt(this.auth.getToken())?.email}).subscribe((res) => {
        this.cart.push(res.user?.cart)
      })
      let info = {
        email: this.profile.parseJwt(this.auth.getToken())?.email
      }
      this.profile.getUserInfo(info).subscribe((data) => {
        this.user = data
      })
    }
    getCart() {
      return this.cart[0]
    }
    deleteFromCart(id: any) {
      this.profile.deleteRecordFromCart(
        {
          email: this.profile.parseJwt(this.auth.getToken())?.email,
          id: id
        }
      ).subscribe(res => {
        location.reload()
      })
    }

    buyCar(data: any) {
      console.log(data[2])
      if(this.user.balance >= data[1]) {
        this.bought_cars.addNewBoughtCar({
          userId: this.user._id,
          brand: data[2].brand,
          model: data[2].model,
          color: data[2].color,
          price: data[2].price,
          image: data[2].image,
          yearOfRelease: data[2].yearOfRelease
        }).subscribe(res => {

          const newBalance = this.user.balance - data[1]
          this.profile.updateBalance({email: this.profile.parseJwt(this.auth.getToken()).email, balance: newBalance}).subscribe(res => {
            this.cars.deleteCar({id: data[0]}).subscribe(res => {
              console.log(res)
            })
            this.deleteFromCart(data[0])          
          })
        })
      }
      else {
        this._snackBar.open("You don't have enough money to buy this car", 'Damn!', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    }
}
