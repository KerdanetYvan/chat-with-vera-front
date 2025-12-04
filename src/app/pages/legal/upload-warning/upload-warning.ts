import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-warning',
  imports: [],
  templateUrl: './upload-warning.html',
  styleUrl: './upload-warning.css',
})
export class UploadWarning {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  // Enregistre l'acceptation et navigue vers le chat
  acceptAndNavigate(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('fileUploadWarningAccepted', 'true');
    }
    this.router.navigate(['/chat']);
  }
}
