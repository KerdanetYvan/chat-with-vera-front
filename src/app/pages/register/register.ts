import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AuthHttpService, RegisterPayload, LoginPayload, LoginResponse } from '../../core/services/auth-http.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authHttp: AuthHttpService,
    private auth: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log('Formulaire invalide');
      return;
    }

    const payload = this.registerForm.value as RegisterPayload;
    console.log('Payload prêt à être envoyé :', payload);

    this.authHttp.register(payload).subscribe({
      next: (res: any) => {
        console.log('Inscription réussie ✅', res);

        const loginPayload: LoginPayload = {
          email: payload.email,
          password: payload.password,
        };

        this.authHttp.login(loginPayload).subscribe({
          next: (loginRes: LoginResponse) => {
            this.auth.setToken(loginRes.access_token); // on stocke le JWT
            console.log('Connexion automatique réussie après inscription ✅', loginRes);
            this.router.navigate(['/dashboard']); // ou '/chat' selon ton besoin
          },
          error: (err: unknown) => {
            console.error('Erreur lors de la connexion automatique ❌', err);
          },
        });
      },
      error: (err: unknown) => {
        console.error("Erreur lors de l'inscription ❌", err);
      },
    });
  }
}
