import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BoughtcarsService } from '../../services/boughtcars.service';
import { ProfileService } from '../../services/profile.service';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-admin-user-purchases',
  standalone: true,
  imports: [HeaderComponent, MatTableModule],
  templateUrl: './admin-user-purchases.component.html',
  styleUrl: './admin-user-purchases.component.css'
})
export class AdminUserPurchasesComponent implements OnInit{

  constructor(private BoughtCars: BoughtcarsService, private profile: ProfileService) {}

  allPurchases: Array<any> = []
  displayedColumns: string[] = ['userId', 'date', 'brand', 'model', 'yearOfRelease', 'color', 'price'];
  ngOnInit(): void {
      this.BoughtCars.getAllPurchase().subscribe(res => {
        console.log(res)
        this.allPurchases = res  
      })
  }
}
