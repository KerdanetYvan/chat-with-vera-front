import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

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
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

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
