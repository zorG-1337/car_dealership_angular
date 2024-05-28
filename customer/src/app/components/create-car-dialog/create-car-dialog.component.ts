import { Component, Inject } from '@angular/core';
import {
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
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
@Component({
  selector: 'app-create-car-dialog',
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
  templateUrl: './create-car-dialog.component.html',
  styleUrl: './create-car-dialog.component.css'
})
export class CreateCarDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateCarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private profile: ProfileService, private auth: AuthService) { } 
    selectedFile: any = false
    createdCar!:FormData
    myForm: FormGroup = new FormGroup({
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      yearOfRelease: new FormControl('', [Validators.required, Validators.pattern("[0-9]+")]),
      drive: new FormControl('', [Validators.required]),
      engine: new FormControl('', [Validators.required]),
      rudder: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern("[0-9]+")])
    })
    closeForm(): void {
      this.dialogRef.close(false);
    }
    sendForm(): void {
      this.createdCar = new FormData()
      this.createdCar.append('image', this.selectedFile, this.selectedFile.name)
      this.createdCar.append('brand', this.myForm.value.brand)
      this.createdCar.append("model", this.myForm.value.model)
      this.createdCar.append("color", this.myForm.value.color)
      this.createdCar.append("yearOfRelease", this.myForm.value.yearOfRelease)
      this.createdCar.append("drive", this.myForm.value.drive)
      this.createdCar.append("engine", this.myForm.value.engine)
      this.createdCar.append("rudder", this.myForm.value.rudder)
      this.createdCar.append("price", this.myForm.value.price)

      this.dialogRef.close(this.createdCar)
    }
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0]
    }
}


