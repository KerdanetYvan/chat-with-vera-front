import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Chat } from './pages/chat/chat';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { authGuard } from './core/auth-guard';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'chat', component: Chat },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard], },
  { path: 'login', component: Login },

  // Fallback route
  { path: '**', redirectTo: '' }
];
