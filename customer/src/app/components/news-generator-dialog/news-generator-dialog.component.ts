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
@Component({
  selector: 'app-news-generator-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,MatSelectModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './news-generator-dialog.component.html',
  styleUrl: './news-generator-dialog.component.css'
})
export class NewsGeneratorDialogComponent {

  myForm = new FormGroup({
    header: new FormControl("", [Validators.required]),
    body: new FormControl("", [Validators.required])
  })

  constructor(public dialogRef: MatDialogRef<NewsGeneratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


    closeForm(): void {
      this.dialogRef.close(false);
    }

    addNews() {
      this.dialogRef.close({
        header: this.myForm.value.header,
        body: this.myForm.value.body
      });
    }
}
