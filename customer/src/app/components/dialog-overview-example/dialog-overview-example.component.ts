import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-dialog-overview-example',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './dialog-overview-example.component.html',
  styleUrl: './dialog-overview-example.component.css'
})
export class DialogOverviewExampleComponent{
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profile: ProfileService, private auth: AuthService) { } 
  /*
    user!: any

  
  ngOnInit(): void {
    let info = {
      email: this.profile.parseJwt(this.auth.getToken()).email
    }


    this.profile.getUserInfo(info).subscribe((data) => {
      this.user = data
    })
  }
  */
  myForm: FormGroup = new FormGroup({
    name: new FormControl(`${this.data.name}`),
    surname: new FormControl(`${this.data.surname}`),
    city: new FormControl(`${this.data.city}`)
  })
  sendForm(): void {
    this.dialogRef.close({
      email: this.profile.parseJwt(this.auth.getToken()).email,
      name: this.myForm.value.name,
      surname: this.myForm.value.surname,
      city: this.myForm.value.city
    });
  }
  closeForm(): void {
    this.dialogRef.close(false);
  }

  


}
