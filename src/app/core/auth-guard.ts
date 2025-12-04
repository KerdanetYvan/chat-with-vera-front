// src/app/core/auth-guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './services/auth.service';

/**
 * Guard de route côté front.
 * - vérifie qu'un token est présent
 * - vérifie que le rôle dans le JWT est "admin"
 * - sinon, redirige vers /login
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  // Pendant le SSR, on autorise l'accès (la vérification se fera côté client)
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // Pas de token -> login
  if (!auth.isLoggedIn()) {
    router.navigate(['/login'], {
      queryParams: { redirectTo: state.url },
    });
    return false;
  }

  // Vérifie le rôle dans le JWT
  const role = auth.getUserRole();
  if (role !== 'admin') {
    // Option : rediriger vers autre page si pas admin
    router.navigate(['/login']);
    return false;
  }

  return true; // OK, admin connecté
};
