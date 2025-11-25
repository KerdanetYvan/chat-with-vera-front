import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';



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

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,) {
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
      console.log("Formulaire invalide");
      return;
    }

    const payload = this.registerForm.value as {
      username?: string;
      email: string;
      password: string;
    };
    console.log('Payload prêt à être envoyé :', payload);

    this.auth.register(payload).subscribe({
      next: (res) => {
        console.log('Inscription réussie ✅', res);

        // Auto-login :
        const loginPayload = {
          email: payload.email,
          password: payload.password,
        };

        this.auth.login(loginPayload).subscribe({
          next: (loginRes) => {
            this.auth.setSession(loginRes);
            console.log('Connexion automatique réussie après inscription ✅', loginRes);
            this.router.navigate([loginRes.user.role === 'admin' ? '/dashboard' : '/chat']);
          },
          error: (err) => {
            console.error('Erreur lors de la connexion automatique ❌', err);
            // plus tard : afficher un message d'erreur dans le template
          },
        });
      },
      error: (err) => {
        console.error('Erreur lors de l\'inscription ❌', err);
        // plus tard : afficher un message d'erreur dans le template
      },
    });
  }
}
