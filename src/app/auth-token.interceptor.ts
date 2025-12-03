// auth/auth-token.interceptor.ts (Angular)

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  /**
   * Cette méthode est appelée pour CHAQUE requête HTTP envoyée par Angular.
   * - On lit le token stocké (ex : dans localStorage après le login).
   * - Si un token existe, on clone la requête et on lui ajoute le header Authorization: Bearer <token>.
   * - Sinon, on laisse passer la requête telle quelle.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupère le token JWT stocké côté front (clé à adapter à ton implémentation de login)
    const token = localStorage.getItem('access_token');

    // Si pas de token → on ne modifie pas la requête
    if (!token) {
      return next.handle(req);
    }

    // Clone la requête en ajoutant le header Authorization
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Passe la requête modifiée au prochain handler (et donc vers le backend Nest)
    return next.handle(authReq);
  }
}
