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
  selector: 'app-change-password',
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
    ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profile: ProfileService, private auth: AuthService) { } 
    myForm: FormGroup = new FormGroup({
      oldPassword: new FormControl("", [Validators.required]),
      newPassword: new FormControl("", [Validators.minLength(8), Validators.required]),
      newPasswordRepeat: new FormControl("", [Validators.minLength(8), Validators.required])
    })
    sendForm(): void { 
      this.dialogRef.close(
        {
          oldPassword: this.myForm.value.oldPassword,
          newPassword: this.myForm.value.newPassword,
          newPasswordRepeat: this.myForm.value.newPasswordRepeat
        }
      )
    }
    closeForm(): void {
      this.dialogRef.close(false);
    }
}
