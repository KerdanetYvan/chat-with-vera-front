import { NgOptimizedImage, CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, ChangeDetectorRef, ViewChild, ElementRef, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matPlusOutline, matSendOutline, matFileUploadOutline } from '@ng-icons/material-icons/outline';
import { ThemeService } from '../../core/services/theme.service';

import { AuthService } from '../../core/services/auth.service';
import { VeraApi } from '../../core/services/vera-api';
import { NavBar } from '../../components/nav-bar/nav-bar';

interface ChatMessage {
  role: 'user' | 'vera';
  content: string;
  links?: string[];
  createdAt: Date;
}

interface ChatTurn {
  question: ChatMessage;
  answer?: ChatMessage;
}

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [NgOptimizedImage, CommonModule, FormsModule, NavBar, NgIcon],
  viewProviders: [
    provideIcons({
      matPlusOutline,
      matSendOutline,
      matFileUploadOutline,
    }),
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  private auth = inject(AuthService);
  private veraApi = inject(VeraApi);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  isDarkMode = false;
  showWarningModal = false;

  constructor(private theme: ThemeService) {
    // Initialiser immédiatement
    this.isDarkMode = this.theme.currentValue;

    // S'abonner aux changements
    this.theme.getDarkMode().subscribe(value => {
      this.isDarkMode = value;
    });
  }

  ngOnInit() {
    // Autre logique d'initialisation si nécessaire
  }

  // Vérifie si l'utilisateur a déjà accepté l'avertissement
  private hasAcceptedWarning(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return localStorage.getItem('fileUploadWarningAccepted') === 'true';
  }

  // Enregistre que l'utilisateur a accepté l'avertissement
  private setWarningAccepted(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem('fileUploadWarningAccepted', 'true');
  }

  selectedFiles: File[] = [];
  hasFiles = false;

  // état du menu d’upload
  isUploadMenuOpen = false;

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      this.selectedFiles = [];
      this.hasFiles = false;
      return;
    }

    const newFiles = Array.from(input.files);

    this.selectedFiles = [...this.selectedFiles, ...newFiles];
    this.hasFiles = this.selectedFiles.length > 0;
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    // on recrée le tableau pour que le changement soit bien détecté
    this.selectedFiles = [...this.selectedFiles];
    this.hasFiles = this.selectedFiles.length > 0;
  }


  // on n’utilise plus querySelector, on passe par le ViewChild
  triggerFileInput() {
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.click();
    }
  }

  // ouvre / ferme le menu
  toggleUploadMenu() {
    this.isUploadMenuOpen = !this.isUploadMenuOpen;
  }

  // action du bouton dans le menu : affiche d'abord la modale d'avertissement (si pas déjà accepté)
  chooseFile() {
    this.isUploadMenuOpen = false;

    // Si l'utilisateur a déjà accepté l'avertissement, ouvrir directement le sélecteur
    if (this.hasAcceptedWarning()) {
      this.triggerFileInput();
    } else {
      this.showWarningModal = true;
    }
  }

  // Fermer la modale
  closeWarningModal() {
    this.showWarningModal = false;
  }

  // Continuer vers l'import de fichiers après avoir lu l'avertissement
  continueToFileUpload() {
    this.setWarningAccepted();
    this.showWarningModal = false;
    this.triggerFileInput();
  }

  // Naviguer vers la page d'avertissement complète
  goToWarningPage() {
    this.router.navigate(['/legal/upload-warning']);
  }

  autoResize(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  userId = this.auth.getUserId() ?? 'invite';
  messages: ChatMessage[] = [];
  turns: ChatTurn[] = [];
  input = '';
  isLoading = false;

  isListMessageEmpty = () => this.turns.length === 0;

  extractUrls(text: string): string[] {
    if (!text) return [];

    const urlRegex = /https?:\/\/[^\s)]+/g;

    const matches = text.match(urlRegex);

    if (!matches) return [];

    // nettoyage léger (supprime les virgules, points, parenthèses)
    return matches.map(url =>
      url.replace(/[.,);"]+$/, "")
    );
  }

  getFavicon(url: string): string {
    try {
      const parsedUrl = new URL(url);
      return `${parsedUrl.protocol}//${parsedUrl.hostname}/favicon.ico`;
    } catch {
      return '';
    }
  }

  isLinks(msg: ChatMessage): boolean {
    const hasLinks = msg.links !== undefined && msg.links.length > 0;
    return hasLinks;
  }

  isMultipleLinks(msg: ChatMessage): boolean {
    const multiple = msg.links !== undefined && msg.links.length > 1;
    return multiple;
  }

  onFaviconError(event: Event, url: string) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';

    // Récupérer le hostname
    const hostname = new URL(url).hostname.replace('www.', '');

    // Ajouter un élément texte juste après l'image
    const fallback = document.createElement('span');
    fallback.textContent = hostname;
    fallback.className = 'favicon-fallback';

    img.parentElement?.appendChild(fallback);
  }

  onSubmit() {
    const question = this.input.trim();

    // même condition que chez toi pour l'instant
    if ((!question && this.hasFiles) || this.isLoading) return;

    // reset champ texte
    this.input = '';

    const questionMsg: ChatMessage = {
      role: 'user',
      content: question,
      createdAt: new Date(),
    };

    // ➜ on ajoute un "tour" avec uniquement la question
    this.turns = [
      ...this.turns,
      { question: questionMsg },
    ];

    this.isLoading = true;
    this.cdr.markForCheck();

    this.veraApi
      .ask(
        question,
        this.userId,
        this.selectedFiles
      )
      .subscribe({
        next: (res) => {
          console.log('Réponse VERA API:', res);

          const answerMsg: ChatMessage = {
            role: 'vera',
            content:
              (res as any).data ??
              (res as any).answer ??
              String(res),
            links: this.extractUrls((res as any).data ?? (res as any).answer ?? String(res)),
            createdAt: new Date(),
          };
          console.log('AnswerMsg:', answerMsg);

          // ➜ on met la réponse dans le DERNIER tour
          const lastIndex = this.turns.length - 1;
          this.turns[lastIndex] = {
            ...this.turns[lastIndex],
            answer: answerMsg,
          };

          // reset fichiers
          this.selectedFiles = [];
          this.hasFiles = false;

          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Erreur VERA API:', err);

          const errorMsg: ChatMessage = {
            role: 'vera',
            content:
              "error",
            createdAt: new Date(),
          };

          // ➜ même logique : on met le message d’erreur comme "réponse" du dernier tour
          const lastIndex = this.turns.length - 1;
          this.turns[lastIndex] = {
            ...this.turns[lastIndex],
            answer: errorMsg,
          };

          this.isLoading = false;
          this.cdr.markForCheck();
        },
      });
  }
}
