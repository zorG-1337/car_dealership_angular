import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { HeaderComponent } from '../header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, HeaderComponent, MatFormFieldModule, ReactiveFormsModule, FormsModule,
    MatSelectModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router, private profile: ProfileService) {}
  respond!:any;
  myForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
  });
  customer!: Object
  onSubmit() {
    this.customer = {
      email: this.myForm.value.email,
      password: this.myForm.value.password,
    }
    this.respond = this.auth.loginCustomer(this.customer).subscribe((data) => {
      this.auth.setToken(data.token);
      this.profile.userInfo = data.user
      this.router.navigate(['/profile'])
    })
  }
}
