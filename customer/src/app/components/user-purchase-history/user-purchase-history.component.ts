import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BoughtcarsService } from '../../services/boughtcars.service';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-purchase-history',
  standalone: true,
  imports: [HeaderComponent, NgFor, NgIf],
  templateUrl: './user-purchase-history.component.html',
  styleUrl: './user-purchase-history.component.css'
})
export class UserPurchaseHistoryComponent implements OnInit{
  constructor(private boughtCars: BoughtcarsService, private profile: ProfileService, private auth: AuthService) {}

  allPurchases!: any

  ngOnInit(): void {
      this.boughtCars.getAllUsersPurchases({userId: this.profile.parseJwt(this.auth.getToken())?.user_id}).subscribe(res => {
        this.allPurchases = res
      })
  }

  getUserPurchases() {
    return this.allPurchases
  }

  leaveFeedback(rate: any) {
    console.log(rate)
  }
}
