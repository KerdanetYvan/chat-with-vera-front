import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { VeraQueryRequest, VeraQueryResponse } from '../models/vera';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VeraApi {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/vera`;

  ask(query: string, userId: string, files: string[] = []): Observable<VeraQueryResponse> {
    const body: VeraQueryRequest = {
      queryId: crypto.randomUUID(),
      userId,
      files,
      query
    };

    return this.http.post<VeraQueryResponse>(`${this.baseUrl}/query`, body);
  }
}
