import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-warning',
  imports: [],
  templateUrl: './upload-warning.html',
  styleUrl: './upload-warning.css',
})
export class UploadWarning {
  private router = inject(Router);

  // Enregistre l'acceptation et navigue vers le chat
  acceptAndNavigate(): void {
    localStorage.setItem('fileUploadWarningAccepted', 'true');
    this.router.navigate(['/chat']);
  }
}
