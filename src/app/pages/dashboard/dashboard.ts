import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardApiService, DashboardOverview } from '../dashboard/services/dashboard-api.service'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DatePipe],   // ⬅ NgIf, NgFor, date pipe
  templateUrl: './dashboard.html',
})
export class Dashboard {
  overview?: DashboardOverview;
  loading = false;
  error?: string;   // ⬅ manquait

  constructor(private dashboardApi: DashboardApiService) {}

  ngOnInit(): void {
    this.loadOverview();
  }

  loadOverview(): void {
    this.loading = true;
    this.error = undefined;

    this.dashboardApi.getOverview().subscribe({
      next: (data) => {
        this.overview = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors du chargement du dashboard';
        this.loading = false;
      },
    });
  }
}
