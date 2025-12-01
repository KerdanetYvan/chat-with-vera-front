import { Component } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ThemeService } from '../../core/services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [NgOptimizedImage, CommonModule, RouterModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  isMenuOpen = false;
  isDarkMode$: Observable<boolean>;

  constructor(private theme: ThemeService) {
    this.isDarkMode$ = this.theme.getDarkMode();
  }

  toggleTheme() {
    this.theme.toggleTheme();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
