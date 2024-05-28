import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { NewsGeneratorDialogComponent } from '../news-generator-dialog/news-generator-dialog.component';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { NewsService } from '../../services/news.service';
import { NgFor } from '@angular/common';
import { EditnewsdialogComponent } from '../editnewsdialog/editnewsdialog.component';
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [HeaderComponent, MatButtonModule, MatDividerModule, MatDialogModule, NgFor],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit{

  adminButtonHidden!: boolean
  user!: any
  availableNews!: any
  hideButtons!: any
  constructor(public dialog: MatDialog, private profile: ProfileService, private auth: AuthService,
    private news: NewsService
  ) {}

  ngOnInit(): void {
    let info = {
      email: this.profile.parseJwt(this.auth.getToken())?.email
    }
    this.profile.getUserInfo(info).subscribe((data) => {
      this.user = data
    })

    this.news.getNews().subscribe((data) => {
      this.availableNews = data
    })
    this.hideButtons = this.profile.parseJwt(this.auth.getToken())?.email !== 'admin123@mail.ru'
  }

  openDialogToCreateNews(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    // this.profile.test()
    const dialogRef = this.dialog.open(NewsGeneratorDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        result.authorName = this.user.name
        result.authorSurname = this.user.surname
        this.news.createNews(result).subscribe(res => {
          location.reload()
        })
      }
    })
  }

  openDialogToEditNews(id: any): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    dialogConfig.data = this.availableNews.find((news: any) => news._id === id)
    // this.profile.test()
    const dialogRef = this.dialog.open(EditnewsdialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.news.editNews(result).subscribe(data => {
          location.reload()
        })
      }
    })
  }

  deleteNews(id: any) {
    this.news.deleteNews(id).subscribe(res => {
      console.log(res)
    })
  }
}
