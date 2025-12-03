import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
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
  error = '';
  isDarkMode = false;

  private theme = inject(ThemeService);

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.isDarkMode = this.theme.currentValue;
    this.theme.getDarkMode().subscribe(value => {
      this.isDarkMode = value;
    });
  }

  onSubmit() {
    const payload = {
      email: this.email,
      password: this.password,
    };

    this.auth.login(payload).subscribe({
      next: (res) => {
        this.auth.setSession(res);

        this.router.navigate([res.user.role === 'admin' ? '/dashboard' : '/chat']);
      },
      error: () => {
        this.error = "Identifiants invalides.";
      }
    });
  }
}
