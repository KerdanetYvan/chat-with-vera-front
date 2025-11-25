import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

type Session = {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'user';
  }
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _session = signal<Session | null>(null);
  session = this._session.asReadonly();

  // 👇 Plus besoin de stocker isLogged, on le DÉDUIT
  isLoggedIn = computed(() => this._session() !== null);
  role = computed(() => this._session()?.user.role ?? null);

  private authUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem('vera_session');
      if (raw) {
        const parsed = JSON.parse(raw) as Session;
        this._session.set(parsed);
      }
    }
  }

  register(payload: { username?: string; email: string; password: string }) {
    return this.http.post(`${this.authUrl}/register`, payload);
  }

  login(payload: {email: string, password: string}): Observable<Session> {
    return this.http.post<Session>(`${this.authUrl}/login`, payload);
  }

  logout() {
    this._session.set(null);
    localStorage.removeItem('vera_session');
  }

  setSession(session: Session) {
    this._session.set(session);
    localStorage.setItem('vera_session', JSON.stringify(session));
  }
}
