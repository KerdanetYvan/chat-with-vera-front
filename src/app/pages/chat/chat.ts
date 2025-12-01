import { NgOptimizedImage, CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matPlusOutline, matSendOutline, matFileUploadOutline } from '@ng-icons/material-icons/outline';

import { AuthService } from '../../core/services/auth';
import { VeraApi } from '../../core/services/vera-api';
import { NavBar } from '../../components/nav-bar/nav-bar';

interface ChatMessage {
  role: 'user' | 'vera';
  content: string;
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

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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

    this.selectedFiles = Array.from(input.files);
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

  // action du bouton dans le menu : ouvre le sélecteur de fichiers
  chooseFile() {
    this.isUploadMenuOpen = false;
    this.triggerFileInput();
  }

  autoResize(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  userId = this.auth.session()?.user.id ?? 'invite';
  messages: ChatMessage[] = [];
  turns: ChatTurn[] = [];
  input = '';
  isLoading = false;

  isListMessageEmpty = () => this.turns.length === 0;

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
            createdAt: new Date(),
          };

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
