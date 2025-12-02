import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

import { NavBar } from '../../components/nav-bar/nav-bar';

@Component({
  standalone: true,
  selector: 'app-landing',
  imports: [NavBar, CommonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  isDarkMode = false;

  constructor(private theme: ThemeService) {
    // Initialiser immédiatement
    this.isDarkMode = this.theme.currentValue;

    // S'abonner aux changements
    this.theme.getDarkMode().subscribe(value => {
      this.isDarkMode = value;
    });
  }  ngOnInit() {
    // Autre logique d'initialisation si nécessaire
  }

}
