import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';
import { PwaService } from '../../core/services/pwa.service';

import { NavBar } from '../../components/nav-bar/nav-bar';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-landing',
  imports: [NavBar, CommonModule, RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  // Gestion de l'installation PWA
  private pwaService = inject(PwaService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  async onClickInstallNotif(){
    const canPrompt = await firstValueFrom(this.pwaService.canPrompt$);

    if (canPrompt) {
      const result = await this.pwaService.openInstallPrompt();

      if (result === 'dismissed') {
        this.router.navigate(['/installer-vera']);
      }
    } else {
      this.router.navigate(['/installer-vera']);
    }
  }

  showNotif = signal(true);

  closeNotif() {
    this.showNotif.set(false);
    // Sauvegarder dans localStorage pour ne plus afficher (uniquement côté navigateur)
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('pwa-notif-dismissed', 'true');
    }
  }

  // Gestion du thème
  isDarkMode = false;

  constructor(private theme: ThemeService) {
    // Initialiser immédiatement
    this.isDarkMode = this.theme.currentValue;

    // S'abonner aux changements
    this.theme.getDarkMode().subscribe(value => {
      this.isDarkMode = value;
    });
  }

  ngOnInit() {
    // Vérifier qu'on est bien dans le navigateur (pas en SSR)
    if (isPlatformBrowser(this.platformId)) {
      // Vérifier si l'utilisateur a déjà fermé la notification
      const dismissed = localStorage.getItem('pwa-notif-dismissed');

      if (dismissed === 'true') {
        this.showNotif.set(false);
      } else {
        // Afficher la notification et la masquer après 10 secondes
        console.log('Notification PWA affichée');
        setTimeout(() => {
          console.log('Notification PWA masquée automatiquement');
          this.showNotif.set(false);
        }, 10000);
      }
    }
  }
}

