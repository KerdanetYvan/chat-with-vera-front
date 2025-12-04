import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DashboardApiService, DashboardOverview } from '../dashboard/services/dashboard-api.service';
import { RealtimeService } from '../../core/services/realtime.service';
import { ResponseEvent } from '../../core/models/response.model';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../core/services/theme.service';
import { NavBar } from '../../components/nav-bar/nav-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NavBar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit, OnDestroy {
  overview?: DashboardOverview;
  loading = false;
  error?: string;

  // Nouvelles propriétés pour le temps réel
  responses: ResponseEvent[] = [];
  isConnected = false;
  private realtimeSubscription?: Subscription;

  isDarkMode = false;
  private theme = inject(ThemeService);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private dashboardApi: DashboardApiService,
    private realtimeService: RealtimeService
  ) {
    this.isDarkMode = this.theme.currentValue;
    this.theme.getDarkMode().subscribe(value => {
      this.isDarkMode = value;
    });
  }

  ngOnInit(): void {
    console.log('🚀 ngOnInit - isPlatformBrowser:', isPlatformBrowser(this.platformId));
    // Ne charger les données que côté navigateur (pas pendant le SSR)
    if (isPlatformBrowser(this.platformId)) {
      console.log('✅ Côté navigateur détecté, chargement des données...');
      this.loadOverview();
      this.connectToRealtime();
    } else {
      console.log('⏭️ SSR détecté, chargement des données ignoré');
    }
  }

  ngOnDestroy(): void {
    // Nettoyer la connexion WebSocket
    this.realtimeSubscription?.unsubscribe();
    this.realtimeService.disconnect();
  }

  loadOverview(): void {
    console.log('🔍 Début du chargement du dashboard...');
    this.loading = true;
    this.error = undefined;

    this.dashboardApi.getOverview().subscribe({
      next: (data) => {
        console.log('📦 Données reçues de l\'API:', data);
        this.overview = data;

        // Charger les réponses existantes
        if (data.raw && data.raw.responses) {
          this.responses = data.raw.responses;
          console.log('📊 Réponses chargées:', this.responses.length, this.responses);
        } else {
          console.warn('⚠️ Aucune réponse trouvée dans data.raw.responses');
          console.log('Structure data:', {
            hasRaw: !!data.raw,
            hasResponses: !!(data.raw && data.raw.responses),
            data: data
          });
        }
        this.loading = false;

        // FORCER la détection de changement
        this.cdr.detectChanges();
        console.log('🔄 Détection de changement forcée');
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement:', err);
        this.error = 'Erreur lors du chargement du dashboard';
        this.loading = false;
      },
    });
  }

  connectToRealtime(): void {
    // Connecter au WebSocket
    this.realtimeService.connect();

    // Initialiser l'état de connexion
    this.isConnected = this.realtimeService.isConnected();

    // S'abonner aux changements d'état de connexion
    this.realtimeService.onConnectionStatusChange().subscribe({
      next: (status) => {
        this.isConnected = status;
        console.log('🔄 État WebSocket mis à jour:', status ? 'Connecté' : 'Déconnecté');
        // FORCER la détection de changement
        this.cdr.detectChanges();
      }
    });

    // S'abonner aux mises à jour en temps réel
    this.realtimeSubscription = this.realtimeService.onDataUpdate().subscribe({
      next: (newResponse) => {
        // Ajouter la nouvelle réponse en tête de liste (plus récent en premier)
        this.responses = [newResponse, ...this.responses];
        console.log('✅ Nouvelle réponse ajoutée:', newResponse);
        // FORCER la détection de changement
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('❌ Erreur temps réel:', err);
      }
    });
  }

  // Méthode utilitaire pour formater la date
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('fr-FR');
  }
}
