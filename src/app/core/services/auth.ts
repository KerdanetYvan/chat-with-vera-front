import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Initialise le signal à false côté serveur (pas de localStorage)
  private _isLoggedIn = signal<boolean>(false);

  isLoggedIn = this._isLoggedIn.asReadonly();

  constructor() {
    // Chargement du state seulement côté navigateur
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('vera_auth') === 'true';
      this._isLoggedIn.set(saved);
    }
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
