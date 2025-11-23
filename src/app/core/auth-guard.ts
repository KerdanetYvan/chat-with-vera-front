import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // On vérifie si on est dans le navigateur (et pas en SSR)
  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

  // Côté serveur : on laisse passer, le client gérera la redirection après hydratation
  if (!isBrowser) {
    return true;
  }

  const isLoggedIn = localStorage.getItem('vera_auth') === 'true';

  if (!isLoggedIn) {
    router.navigate(['/login'], {
      queryParams: { redirectTo: state.url },
    });
    return false;
  }

  return true;
};
