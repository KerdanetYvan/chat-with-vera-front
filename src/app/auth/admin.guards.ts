import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const token = this.auth.getToken();
    const role = this.auth.getUserRole();

    // Pas de token → on renvoie vers la page de login
    if (!token) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }

    // Token présent mais rôle différent de admin → on bloque l'accès
    if (role !== 'admin') {
      this.router.navigate(['/']); // ou page "forbidden"
      return false;
    }

    // OK : user connecté et admin
    return true;
  }
}
