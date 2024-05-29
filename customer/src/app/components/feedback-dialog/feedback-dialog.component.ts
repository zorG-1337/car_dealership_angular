import { Component, Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-feedback-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,MatSelectModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, NgIf],
  templateUrl: './feedback-dialog.component.html',
  styleUrl: './feedback-dialog.component.css'
})
export class FeedbackDialogComponent {

  myForm = new FormGroup({
      header: new FormControl("", [Validators.required, Validators.minLength(8)]),
      comment: new FormControl("", [Validators.required, Validators.minLength(8)])
  })

  constructor(public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


    closeForm(): void {
      console.log(this.data)
      this.dialogRef.close(false);
    }

    sendFeedback(): void {
      this.dialogRef.close(
        {
          header: this.myForm.value.header,
          comment: this.myForm.value.comment,
          rating: this.data
        }
      );
    }
}
