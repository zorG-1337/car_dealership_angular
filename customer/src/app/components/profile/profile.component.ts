import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleComponent } from '../dialog-overview-example/dialog-overview-example.component';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AddtugriksComponent } from '../addtugriks/addtugriks.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, HeaderComponent, MatButtonModule, MatDialogModule, FormsModule,
    MatInputModule, MatFormFieldModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  constructor(private profile: ProfileService, private auth: AuthService, 
    public dialog: MatDialog, private _snackBar: MatSnackBar
  ) {  }
  user!:any
  info!: Object
  userImage!:string
  selectedFile!: any
  accessToPurchases!: boolean
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  ngOnInit(): void {
    let info = {
      email: this.profile.parseJwt(this.auth.getToken()).email
    }
    this.accessToPurchases = info.email === 'admin123@mail.ru'
    console.log(this.accessToPurchases)
    this.profile.getUserInfo(info).subscribe((data) => {
      this.user = data
      if(this.user.image === "") {
        this.user.image = `../../../assets/1683314075_furman-top-p-pitbul-na-chernom-fone-vkontakte-60.jpg`
      }
      else {
        this.user.image = `../../../assets/${this.user.image}`
      }
    })
  }
  openDialog(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    // this.profile.test()
    this.profile.getUserInfo({email: this.profile.parseJwt(this.auth.getToken()).email}).subscribe(data => {
      this.user = data
    })
    dialogConfig.data = this.user
    const dialogRef = this.dialog.open(DialogOverviewExampleComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.profile.updateUserInfo(result).subscribe((data) => {
          console.log(data)
          return data
        })
      }
    });
  }
  openDialogForPasswordChanging(): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true
    const dialogRef = this.dialog.open(ChangePasswordComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        result.email = this.user.email
        this.profile.updatePassword(result).subscribe(res => {
          this._snackBar.open('You have changed your password', 'Cool!', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        })
      }
    })
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
    let formData = new FormData()
    formData.append('image', this.selectedFile, this.selectedFile.name)
    formData.append('email', this.user.email)
    this.profile.updateUserImage(formData).subscribe(data => {
      console.log(data)
      // location.reload();
    })
  }

  openDialogToAddTugriks() {
    let dialogConfigTestDrive = new MatDialogConfig();
    dialogConfigTestDrive.disableClose = true
    dialogConfigTestDrive.width = '450px'
    const dialogRef = this.dialog.open(AddtugriksComponent, dialogConfigTestDrive);
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const newBalance = this.user.balance + Number(result)

        this.profile.updateBalance({email: this.profile.parseJwt(this.auth.getToken()).email, balance: newBalance}).subscribe(res => {
          location.reload();
        })
        
      }
    })
  }
      
    
}




