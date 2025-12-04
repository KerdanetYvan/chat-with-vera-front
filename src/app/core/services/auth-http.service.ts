// src/app/core/services/auth-http.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const API_BASE = environment.apiUrl;

export interface RegisterPayload {
  username?: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  constructor(private http: HttpClient) {}

  register(body: RegisterPayload): Observable<any> {
    return this.http.post(`${API_BASE}/auth/register`, body);
  }

  login(body: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_BASE}/auth/login`, body, { withCredentials: true });
  }
}
