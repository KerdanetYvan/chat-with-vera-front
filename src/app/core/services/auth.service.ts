// src/app/core/services/auth.service.ts
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  username?: string;
  iat: number;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly EMAIL_KEY = 'user_email';
  private readonly USERNAME_KEY = 'user_username';
  private readonly ROLE_KEY = 'user_role';
  private platformId = inject(PLATFORM_ID);

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Stocke le JWT après login
  setToken(token: string): void {
    if (!this.isBrowser()) return;

    // le stockage du token rest inchangé on va juste décoder ensuite le token pour extraire les différentes infos
    localStorage.setItem(this.TOKEN_KEY, token);

    try {
      const payload = jwtDecode<JwtPayload>(token);

      // on chope l'email
      if(payload.email) {
        localStorage.setItem(this.EMAIL_KEY, payload.email);
      }

      // on chope le rôle
      if(payload.role) {
        localStorage.setItem(this.ROLE_KEY, payload.role);
      }

      // on chope le username
      let username =
        payload.username ||
        (payload.email ? payload.email.split('@')[0] : '');

      if(username) {
        localStorage.setItem(this.USERNAME_KEY, username);
      }
    } catch(e: any) {
      this.clearToken();
    }
  }

  // Récupère le JWT (pour interceptor, guards, etc.)
  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EMAIL_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ------------ Getters pratiques --------------

  getUserRole(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.ROLE_KEY);
  }

  getUserEmail(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.EMAIL_KEY);
  }

  getUsername(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.USERNAME_KEY);
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = jwtDecode<JwtPayload>(token);
      return payload.sub || null;
    } catch {
      return null;
    }
  }

}
