import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { VeraQueryRequest, VeraQueryResponse } from '../models/vera';
import { environment } from '../../../environments/environment';
import { form } from '@angular/forms/signals';

@Injectable({
  providedIn: 'root',
})
export class VeraApi {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/vera`;

  ask(question: string, userId: string, files?: File[]) {
    const formData = new FormData();

    formData.append('userId', userId);

    if (question) {
      formData.append('question', question);
    }

    if (files?.length) {
      files.forEach((file) => {
        formData.append('files', file, file.name);
      });
    }

    return this.http.post<{ answer: string }>(this.baseUrl, formData);
  }
}
