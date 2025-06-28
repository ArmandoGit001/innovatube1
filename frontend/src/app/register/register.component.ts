import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { environment } from '../../environments/environment'; //importamos enviroment para la url del backend

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;
  mensaje: string = '';
  private apiUrl = environment.apiUrl;  // <-- URL base desde environment

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      user_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    }, { validators: this.passwordsIguales });
  }

  // Función para validar que ambas contraseñas sean iguales
  passwordsIguales(group: AbstractControl): { [key: string]: any } | null {
    const pass1 = group.get('password')?.value;
    const pass2 = group.get('password2')?.value;
    return pass1 === pass2 ? null : { noCoinciden: true };
  }

  onSubmit() {
    if (this.form.valid) {
      const { password2, ...data } = this.form.value; // excluye password2
      this.http.post(`${this.apiUrl}/registro`, data).subscribe({
        next: (res: any) => {
          this.mensaje = res.message;
          alert('Usuario registrado exitosamente');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          this.mensaje = err.error?.message || 'Ocurrió un error';
        }
      });
    } else {
      this.mensaje = 'Revisa los campos del formulario.';
    }
  }
}
