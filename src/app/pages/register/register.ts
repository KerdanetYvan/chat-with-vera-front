import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth';



@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.registerForm = this.fb.group({
      pseudo: [''],
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

    const payload = this.registerForm.value;
    console.log('Payload prêt à être envoyé :', payload);

    this.auth.register(payload).subscribe({
      next: (res) => {
        console.log('Inscription réussie ✅', res);
        // plus tard : redirection, message de succès, etc.
      },
      error: (err) => {
        console.error('Erreur lors de l’inscription ❌', err);
        // plus tard : afficher un message d'erreur dans le template
      },
    });
  }
}
