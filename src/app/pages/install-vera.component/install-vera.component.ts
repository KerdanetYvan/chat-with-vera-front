import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PwaService } from '../../core/services/pwa.service';
import { ThemeService } from '../../core/services/theme.service';
import { NavBar } from '../../components/nav-bar/nav-bar';
import { firstValueFrom } from 'rxjs';

interface Browser {
  name: string;
  detected: boolean;
}

@Component({
  selector: 'app-install-vera',
  standalone: true,
  imports: [CommonModule, NavBar, RouterModule],
  templateUrl: './install-vera.component.html',
  styleUrl: './install-vera.component.css',
})
export class InstallVeraComponent {
  private pwaService = inject(PwaService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private theme = inject(ThemeService);

  isDarkMode = false;
  canInstallDirectly = signal(false);
  isInstalling = signal(false);
  installSuccess = signal(false);
  detectedBrowser = signal<Browser>({ name: 'unknown', detected: false });

  // Sections accordéon
  expandedSection = signal<string | null>(null);

  constructor() {
    this.isDarkMode = this.theme.currentValue;
    this.theme.getDarkMode().subscribe(value => {
      this.isDarkMode = value;
    });
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Vérifier si l'installation directe est possible
      const canPrompt = await firstValueFrom(this.pwaService.canPrompt$);
      this.canInstallDirectly.set(canPrompt);

      // Détecter le navigateur
      this.detectBrowser();
    }
  }

  async onInstallNow() {
    this.isInstalling.set(true);

    try {
      const result = await this.pwaService.openInstallPrompt();

      if (result === 'accepted') {
        this.installSuccess.set(true);
        setTimeout(() => {
          this.router.navigate(['/chat']);
        }, 2000);
      } else if (result === 'unavailable') {
        // L'installation automatique n'est pas disponible
        alert('L\'installation automatique n\'est pas disponible. Veuillez suivre les instructions manuelles ci-dessous.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'installation:', error);
      alert('Une erreur est survenue. Veuillez suivre les instructions manuelles ci-dessous.');
    } finally {
      this.isInstalling.set(false);
    }
  }

  toggleSection(section: string) {
    this.expandedSection.set(
      this.expandedSection() === section ? null : section
    );
  }

  private detectBrowser() {
    if (!isPlatformBrowser(this.platformId)) return;

    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes('chrome') && !userAgent.includes('edg') && !userAgent.includes('opr')) {
      this.detectedBrowser.set({ name: 'chrome', detected: true });
    } else if (userAgent.includes('firefox')) {
      this.detectedBrowser.set({ name: 'firefox', detected: true });
    } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
      this.detectedBrowser.set({ name: 'safari', detected: true });
    } else if (userAgent.includes('edg')) {
      this.detectedBrowser.set({ name: 'edge', detected: true });
    } else if (userAgent.includes('opr') || userAgent.includes('opera')) {
      this.detectedBrowser.set({ name: 'opera', detected: true });
    } else if (userAgent.includes('samsung')) {
      this.detectedBrowser.set({ name: 'samsung', detected: true });
    } else {
      this.detectedBrowser.set({ name: 'unknown', detected: false });
    }
  }
}
