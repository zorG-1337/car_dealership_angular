import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BoughtcarsService } from '../../services/boughtcars.service';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import {MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';
import { FeedbackService } from '../../services/feedback.service';
@Component({
  selector: 'app-user-purchase-history',
  standalone: true,
  imports: [HeaderComponent, NgFor, NgIf, MatDialogModule],
  templateUrl: './user-purchase-history.component.html',
  styleUrl: './user-purchase-history.component.css'
})
export class UserPurchaseHistoryComponent implements OnInit{
  constructor(private boughtCars: BoughtcarsService, private profile: ProfileService, 
    private auth: AuthService, public dialog: MatDialog, private feedbacks: FeedbackService) {}

  allPurchases!: any
  user!:any

  ngOnInit(): void {
      this.boughtCars.getAllUsersPurchases({userId: this.profile.parseJwt(this.auth.getToken())?.user_id}).subscribe(res => {
        this.allPurchases = res
      })

      this.profile.getUserInfo({email: this.profile.parseJwt(this.auth.getToken())?.email}).subscribe(data => {
        this.user = data
      })
  }

  openDialogToLeaveFeedback(data: any): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.data = data.rating
    const dialogRef = this.dialog.open(FeedbackDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        result.carId = data.carId
        result.userId = this.user._id
        this.feedbacks.createFeedback(result).subscribe((res) => {
          console.log(res)
        })
      }
    })
  }

  getUserPurchases() {
    return this.allPurchases
  }
}
