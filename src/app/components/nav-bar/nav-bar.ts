import { Component } from '@angular/core';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [NgOptimizedImage, CommonModule, RouterModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  isMenuOpen = false;
  isDarkMode = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    // TODO: Implémenter la logique de changement de thème
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }
}
