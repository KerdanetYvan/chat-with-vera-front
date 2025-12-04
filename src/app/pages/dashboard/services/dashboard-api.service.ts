import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const API_BASE = environment.apiUrl;

// Types simples pour commencer, à affiner après coup selon la réponse réelle
export interface DashboardOverview {
  activities: any;
  surveys: any;
  stats: any;
  raw: {
    users: any[];
    surveys: any[];
    responses: any[];
  };
}

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  constructor(private http: HttpClient) {}

  // Appelle GET /api/dashboard/overview (protégé JWT + rôle admin)
  getOverview(): Observable<DashboardOverview> {
    return this.http.get<DashboardOverview>(`${API_BASE}/dashboard/overview`);
  }
}
