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
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-testdrive',
  standalone: true,
  imports: [MatDatepickerModule, MatInputModule, MatFormFieldModule, 
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, MatSelectModule, MatButtonModule, FormsModule],
  templateUrl: './testdrive.component.html',
  styleUrl: './testdrive.component.css'
})
export class TestdriveComponent {
  constructor(
    public dialogRef: MatDialogRef<TestdriveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  testDriveForm = new FormGroup({
    date: new FormControl<Date | null>(null),
  })
  closeForm(): void {
    this.dialogRef.close(false);
  }
  confirmSignUpForTestDrive(): void {
    this.dialogRef.close({
      date: this.testDriveForm.value.date
    })
  }
}
