import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'
import { AuthHttpService } from '../../auth/auth-http.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})

export class Login {
  email = '';
  password = '';

  loading = false;      // 🔹 ajoute cette propriété
  error?: string;       // (facultatif mais utile)

  constructor(
    private authHttp: AuthHttpService,
    private auth: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    this.error = undefined;
    this.loading = true;

    this.authHttp.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.auth.setToken(res.access_token);
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Identifiant ou mot de passe invalide';
        this.loading = false;
      },
    });
  }
}
