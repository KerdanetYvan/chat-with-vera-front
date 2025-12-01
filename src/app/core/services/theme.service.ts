import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private darkMode$ = new BehaviorSubject<boolean>(this.getInitialTheme());

  constructor() {
    this.applyHtmlClass(this.darkMode$.value);
  }

  private getInitialTheme(): boolean {
    if (!this.isBrowser) return false;

    const saved = localStorage.getItem('theme');
    // Retourne false (light mode) par défaut si rien n'est sauvegardé
    return saved === 'dark';
  }

  private applyHtmlClass(isDark: boolean) {
    if (!this.isBrowser) return;
    document.documentElement.classList.toggle('dark', isDark);
  }

  setDarkMode(value: boolean) {
    this.darkMode$.next(value);

    if (this.isBrowser) {
      localStorage.setItem('theme', value ? 'dark' : 'light');
    }

    this.applyHtmlClass(value);
  }

  toggleTheme() {
    const next = !this.darkMode$.value;
    this.setDarkMode(next);
  }

  getDarkMode() {
    return this.darkMode$.asObservable();
  }

  get currentValue() {
    return this.darkMode$.value;
  }
}
