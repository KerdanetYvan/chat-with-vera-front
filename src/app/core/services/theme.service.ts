import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private darkMode$ = new BehaviorSubject<boolean>(this.getInitialTheme());

  private getInitialTheme(): boolean {
    if (!this.isBrowser) return false;

    // Lire depuis localStorage ou défaut à false (light mode)
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  }

  setDarkMode(value: boolean) {
    this.darkMode$.next(value);

    // Persister dans localStorage
    if (this.isBrowser) {
      localStorage.setItem('theme', value ? 'dark' : 'light');
    }
  }

  getDarkMode() {
    return this.darkMode$.asObservable();
  }

  get currentValue() {
    return this.darkMode$.value;
  }
}
