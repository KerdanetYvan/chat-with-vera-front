import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../core/services/auth';
import { VeraApi } from '../../core/services/vera-api';
import { NavBar } from '../../components/nav-bar/nav-bar';

interface ChatMessage {
  role: 'user' | 'vera';
  content: string;
  createdAt: Date;
}

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, NavBar],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  private auth = inject(AuthService);
  private veraApi = inject(VeraApi);
  private cdr = inject(ChangeDetectorRef);

  selectedFiles: File[] = [];
  hasFiles = false;

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

  userId = this.auth.session()?.user.id ?? 'invite';
  messages: ChatMessage[] = [];
  input = '';
  isLoading = false;

  onSubmit() {
    const question = this.input.trim();
    if ((!question && this.hasFiles) || this.isLoading) return;

    // reset champ
    this.input = '';

    // message user
    this.messages = [
      ...this.messages,
      {
        role: 'user',
        content: question,
        createdAt: new Date(),
      },
    ];

    // loader ON
    this.isLoading = true;
    this.cdr.markForCheck(); // 🔥 force Angular à se réveiller

    this.veraApi
      .ask(
        question,
        this.userId,
        this.selectedFiles
      )
      .subscribe({
        next: (res) => {
          // réponse OK (quand ton back marchera)
          console.log('Réponse VERA API:', res);
          this.messages = [
            ...this.messages,
            {
              role: 'vera',
              content: (res as any).data ?? (res as any).answer ?? String(res),
              createdAt: new Date(),
            },
          ];

          this.selectedFiles = [];
          this.hasFiles = false;

          this.isLoading = false;
          this.cdr.markForCheck(); // 🔥 re-rendu immédiat
        },
        error: (err) => {
          console.error('Erreur VERA API:', err);

          // 👉 on ajoute le message d’erreur dans le chat
          this.messages = [
            ...this.messages,
            {
              role: 'vera',
              content:
                "Oups, je n'arrive pas à répondre pour le moment. Réessaye dans quelques instants.",
              createdAt: new Date(),
            },
          ];

          // 👉 on coupe le loader
          this.isLoading = false;

          // 👉 on force Angular à re-rendre la vue
          this.cdr.markForCheck();
        },
    });
  }
}
