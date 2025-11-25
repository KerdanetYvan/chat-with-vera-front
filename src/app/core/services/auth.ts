import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Initialise le signal à false côté serveur (pas de localStorage)
  private _isLoggedIn = signal<boolean>(false);
  isLoggedIn = this._isLoggedIn.asReadonly();

  private _role = signal<'admin' | 'user' | null>(null);
  role = this._role.asReadonly();

  private authUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
    // Chargement du state seulement côté navigateur
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('vera_auth') === 'true';
      this._isLoggedIn.set(saved);

      const savedRole = localStorage.getItem('vera_role') as 'admin' | 'user' | null;
      this._role.set(savedRole);
    }
  }

  register(payload: { pseudo?: string; email: string; password: string }) {
    return this.http.post(`${this.authUrl}/register`, payload);
  }

  login(payload: {username: string, password: string}): Observable<{ role: 'admin' | 'user' }> {
    return this.http.post<{ role: 'admin' | 'user' }>(`${this.authUrl}/login`, payload);
  }

  logout(): void {
    this._isLoggedIn.set(false);
    this._role.set(null);

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('vera_auth');
      localStorage.removeItem('vera_role');
    }
  }

  setLoginState(isLogged: boolean, role: 'admin' | 'user') {
    this._isLoggedIn.set(isLogged);
    this._role.set(role);

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('vera_auth', String(isLogged));
      localStorage.setItem('vera_role', role);
    }
  }
}
