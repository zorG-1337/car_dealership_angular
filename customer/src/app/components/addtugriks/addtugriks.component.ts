import { Component, Inject } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
@Component({
  selector: 'app-addtugriks',
  standalone: true,
  imports: [MatDatepickerModule, MatInputModule, MatFormFieldModule, 
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, MatSelectModule, MatButtonModule, FormsModule],
  templateUrl: './addtugriks.component.html',
  styleUrl: './addtugriks.component.css'
})
export class AddtugriksComponent {
  constructor(
    public dialogRef: MatDialogRef<AddtugriksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    myForm = new FormGroup({
      value: new FormControl("", [Validators.required, Validators.pattern("[0-9]+")])
    })

    closeForm(): void {
      this.dialogRef.close(false);
    }

    AddTugriks() {
      this.dialogRef.close(this.myForm.value.value);
    }
}
