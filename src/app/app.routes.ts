import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Chat } from './pages/chat/chat';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { authGuard } from './core/auth-guard';
import { InstallVeraComponent } from './pages/install-vera.component/install-vera.component';
import { PrivacyPolicy } from './pages/legal/privacy-policy/privacy-policy';
import { Cgu } from './pages/legal/cgu/cgu';
import { LegalNotice } from './pages/legal/legal-notice/legal-notice';
import { UploadWarning } from './pages/legal/upload-warning/upload-warning';
import { About } from './pages/about/about';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'chat', component: Chat },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard], },
  { path: 'login', component: Login },
  { path: 'installer-vera', component: InstallVeraComponent },
  { path: 'legal/privacy-policy', component: PrivacyPolicy },
  { path: 'legal/cgu', component: Cgu },
  { path: 'legal/legal-notice', component: LegalNotice },
  { path: 'legal/upload-warning', component: UploadWarning },
  { path: 'about', component: About },

  // Fallback route
  { path: '**', redirectTo: '' }
];
