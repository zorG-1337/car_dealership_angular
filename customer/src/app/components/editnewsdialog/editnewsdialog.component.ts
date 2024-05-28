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
  selector: 'app-editnewsdialog',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,MatSelectModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './editnewsdialog.component.html',
  styleUrl: './editnewsdialog.component.css'
})
export class EditnewsdialogComponent {
  constructor(public dialogRef: MatDialogRef<EditnewsdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    myForm = new FormGroup({
      header: new FormControl(`${this.data.header}`, [Validators.required]),
      body: new FormControl(`${this.data.body}`, [Validators.required])
    })

    closeForm(): void {
      this.dialogRef.close(false);
    }

    editNews(): void {
      this.dialogRef.close(
        {
          header: this.myForm.value.header,
          body: this.myForm.value.body
        }
      )
    }
}
