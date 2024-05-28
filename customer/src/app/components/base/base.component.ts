import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {
  constructor(private http: HttpClient) {}
}
