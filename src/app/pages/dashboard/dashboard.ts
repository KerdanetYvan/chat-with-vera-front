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

  // Méthode pour extraire le texte avant le "/" (pour affichage lisible)
  getCleanText(value: string | undefined): string {
    if (!value) return 'Non renseigné';
    const text = String(value).split('/')[0].trim();
    return text || 'Non renseigné';
  }

  // Méthode utilitaire pour extraire un nombre d'une string
  // Gère les formats: "3", "Très facile/5", "Oui, beaucoup/5", "Oui, sans hésiter/10", etc.
  private extractNumber(value: string | number | undefined): number {
    if (value === undefined || value === null) return 0;
    if (typeof value === 'number') return value;

    // Nettoyer et extraire le nombre trouvé
    const cleaned = String(value).trim();

    // Format "texte/nombre" (ex: "Très facile/5", "Oui, sans hésiter/10")
    // Extraire le nombre APRÈS le dernier slash
    const slashMatch = cleaned.match(/\/(\d+\.?\d*)$/);
    if (slashMatch) {
      return parseFloat(slashMatch[1]);
    }

    // Format avec nombre au début (ex: "5", "3.5")
    const startMatch = cleaned.match(/^(\d+\.?\d*)/);
    if (startMatch) {
      return parseFloat(startMatch[1]);
    }

    // Format avec nombre n'importe où dans la string
    const anyMatch = cleaned.match(/(\d+\.?\d*)/);
    if (anyMatch) {
      return parseFloat(anyMatch[1]);
    }

    // Si pas de match, retourner 0
    return 0;
  }

  // Calcul de la moyenne globale pour toutes les métriques
  getGlobalAverages() {
    if (this.responses.length === 0) return null;

    const sum = this.responses.reduce((acc, r) => ({
      veraEasy: acc.veraEasy + this.extractNumber(r.veraEasy),
      winTime: acc.winTime + this.extractNumber(r.winTime),
      fiability: acc.fiability + this.extractNumber(r.fiability),
      recommandation: acc.recommandation + this.extractNumber(r.recommandation)
    }), { veraEasy: 0, winTime: 0, fiability: 0, recommandation: 0 });

    const count = this.responses.length;
    return {
      veraEasy: (sum.veraEasy / count).toFixed(2),
      winTime: (sum.winTime / count).toFixed(2),
      fiability: (sum.fiability / count).toFixed(2),
      recommandation: (sum.recommandation / count).toFixed(2)
    };
  }

  // Statistiques par catégorie (source de connaissance)
  getStatsByCategory() {
    const categories = new Map<string, {
      count: number;
      veraEasy: number[];
      winTime: string[];
      fiability: string[];
    }>();

    this.responses.forEach(r => {
      const category = r.whereDoYouHeard || 'Non spécifié';
      if (!categories.has(category)) {
        categories.set(category, {
          count: 0,
          veraEasy: [],
          winTime: [],
          fiability: []
        });
      }

      const cat = categories.get(category)!;
      cat.count++;
      cat.veraEasy.push(this.extractNumber(r.veraEasy));
      cat.winTime.push(this.getCleanText(r.winTime));
      cat.fiability.push(this.getCleanText(r.fiability));
    });

    // Calculer les moyennes et réponses les plus fréquentes pour chaque catégorie
    const result: any[] = [];
    categories.forEach((stats, category) => {
      const avgVeraEasy = stats.veraEasy.length > 0
        ? (stats.veraEasy.reduce((a, b) => a + b, 0) / stats.veraEasy.length).toFixed(2)
        : '0';

      // Trouver la réponse la plus fréquente pour winTime
      const winTimeMode = this.getMostFrequent(stats.winTime);

      // Trouver la réponse la plus fréquente pour fiability
      const fiabilityMode = this.getMostFrequent(stats.fiability);

      result.push({
        category,
        count: stats.count,
        avgVeraEasy,
        mostFrequentWinTime: winTimeMode,
        mostFrequentFiability: fiabilityMode
      });
    });

    // Trier par nombre de réponses (décroissant)
    return result.sort((a, b) => b.count - a.count);
  }

  // Méthode utilitaire pour trouver l'élément le plus fréquent dans un tableau
  private getMostFrequent(arr: string[]): string {
    if (arr.length === 0) return 'N/A';

    const frequency = new Map<string, number>();
    arr.forEach(item => {
      frequency.set(item, (frequency.get(item) || 0) + 1);
    });

    let maxFreq = 0;
    let mostFrequent = arr[0];
    frequency.forEach((count, item) => {
      if (count > maxFreq) {
        maxFreq = count;
        mostFrequent = item;
      }
    });

    return mostFrequent;
  }

  // Classement des réponses les plus positives (par recommandation)
  getTopResponses(limit: number = 5) {
    return [...this.responses]
      .sort((a, b) => this.extractNumber(b.recommandation) - this.extractNumber(a.recommandation))
      .slice(0, limit);
  }

  // Classement des réponses les moins positives
  getBottomResponses(limit: number = 5) {
    return [...this.responses]
      .filter(r => r.recommandation !== undefined)
      .sort((a, b) => this.extractNumber(a.recommandation) - this.extractNumber(b.recommandation))
      .slice(0, limit);
  }

  // Statistiques sur les problèmes rencontrés
  getProblemStats() {
    const withProblems = this.responses.filter(r => {
      const problem = String(r.problem || '').toLowerCase().trim();
      return problem === 'oui' || problem === 'yes' || problem === 'true' || problem === '1';
    }).length;
    const total = this.responses.length;
    return {
      withProblems,
      withoutProblems: total - withProblems,
      percentage: total > 0 ? ((withProblems / total) * 100).toFixed(1) : '0'
    };
  }

  // Vérifier si une réponse a un problème (méthode utilitaire)
  hasProblem(response: ResponseEvent): boolean {
    const problem = String(response.problem || '').toLowerCase().trim();
    return problem === 'oui' || problem === 'yes' || problem === 'true' || problem === '1';
  }

  // Répartition temporelle (réponses par jour)
  getResponsesByDay() {
    const dayMap = new Map<string, number>();

    this.responses.forEach(r => {
      const date = new Date(r.horodateur);
      const dayKey = date.toLocaleDateString('fr-FR');
      dayMap.set(dayKey, (dayMap.get(dayKey) || 0) + 1);
    });

    return Array.from(dayMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  // Analyse des réponses textuelles par distribution (pour questions à choix multiples)
  private analyzeTextResponses(field: 'winTime' | 'veraEasy' | 'fiability' | 'recommandation') {
    const responseMap = new Map<string, number>();
    const total = this.responses.length;

    this.responses.forEach(r => {
      const value = r[field];
      if (value) {
        // Extraire la partie texte avant le "/"
        const text = String(value).split('/')[0].trim();
        responseMap.set(text, (responseMap.get(text) || 0) + 1);
      }
    });

    // Convertir en tableau avec pourcentages et trier par nombre de réponses
    return Array.from(responseMap.entries())
      .map(([text, count]) => ({
        text,
        count,
        percentage: total > 0 ? ((count / total) * 100).toFixed(1) : '0'
      }))
      .sort((a, b) => b.count - a.count);
  }

  // Distribution du gain de temps
  getWinTimeDistribution() {
    return this.analyzeTextResponses('winTime');
  }

  // Distribution de la facilité
  getVeraEasyDistribution() {
    return this.analyzeTextResponses('veraEasy');
  }

  // Distribution de la fiabilité
  getFiabilityDistribution() {
    return this.analyzeTextResponses('fiability');
  }

  // Distribution de la recommandation
  getRecommandationDistribution() {
    return this.analyzeTextResponses('recommandation');
  }
}
