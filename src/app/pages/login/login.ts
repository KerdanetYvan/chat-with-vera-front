import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AuthHttpService } from '../../core/services/auth-http.service';
import { ThemeService } from '../../core/services/theme.service';
import { NavBar } from '../../components/nav-bar/nav-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NavBar],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})

export class Login {
  email = '';
  password = '';

  loading = false;      // 🔹 ajoute cette propriété
  error?: string;       // (facultatif mais utile)

  isDarkMode = false;

  private theme = inject(ThemeService);

  constructor(
    private authHttp: AuthHttpService,
    private auth: AuthService,
    private router: Router,
  ) {
    this.isDarkMode = this.theme.currentValue;
    this.theme.getDarkMode().subscribe(value => {
      this.isDarkMode = value;
    });
  }

  onSubmit(): void {
    this.error = undefined;
    this.loading = true;

    this.authHttp.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        console.log('LOGIN OK, token = ', res.access_token);
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
