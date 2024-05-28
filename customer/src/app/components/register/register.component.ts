import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from '../header/header.component';
import {MatButtonModule} from '@angular/material/button';
import { customer } from '../../models/customer';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IMaskModule } from 'angular-imask'; // Importing mask for phoneMask
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, 
    MatSelectModule, ReactiveFormsModule, HeaderComponent, MatButtonModule, IMaskModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private auth: AuthService, private router: Router) {}
  phoneMask: any = { mask: "+{7}(000)000-00-00" };
  respond:any;
  customer!:customer
  myForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(10)]),
    surname: new FormControl("", [Validators.required, Validators.maxLength(12)]),
    phoneNumber: new FormControl("", [Validators.required, Validators.minLength(16)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    city: new FormControl("")
  })
  onSubmit() {
    this.customer = {
      name: this.myForm.value.name,
      surname: this.myForm.value.surname,
      email: this.myForm.value.email,
      phoneNumber: this.myForm.value.phoneNumber,
      password: this.myForm.value.password,
      city: this.myForm.value.city,
    }

    this.respond = this.auth.registerCustomer(this.customer).subscribe((data) => {
      console.log(data)
      this.router.navigate(['/login'])
    })
  }
}
