import { Component } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment'; //importamos enviroment para la url del backend

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm;

  private apiUrl = environment.apiUrl;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post(`${this.apiUrl}/login`, this.loginForm.value).subscribe({
        next: res => {
          alert('Login exitoso');
          console.log(res);
          const userName = this.loginForm.value.user_name ?? '';
          localStorage.setItem('user_name', userName);
          this.router.navigate(['/home']);
        },
        error: err => {
          alert('Credenciales incorrectas');
        }
      });
    }
  }

  irARegistro() {
    this.router.navigate(['/register']);
  }

}