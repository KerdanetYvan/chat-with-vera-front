import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Initialise le signal à false côté serveur (pas de localStorage)
  private _isLoggedIn = signal<boolean>(false);

  isLoggedIn = this._isLoggedIn.asReadonly();

  private authUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
    // Chargement du state seulement côté navigateur
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('vera_auth') === 'true';
      this._isLoggedIn.set(saved);
    }
  }

  register(payload: { pseudo?: string; email: string; password: string }) {
    return this.http.post(`${this.authUrl}/register`, payload);
  }

  login(username: string, password: string): boolean {
    const ok = username === 'admin' && password === 'vera';

    if (ok) {
      this._isLoggedIn.set(true);

      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('vera_auth', 'true');
      }
    }

    return ok;
  }

  logout(): void {
    this._isLoggedIn.set(false);

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('vera_auth');
    }
  }
}
