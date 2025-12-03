import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Chat } from './pages/chat/chat';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { AdminGuard } from './auth/admin.guards';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'chat', component: Chat },
  { path: 'dashboard', component: Dashboard, canActivate: [AdminGuard], },
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Fallback route
  { path: '**', redirectTo: '' }
];
