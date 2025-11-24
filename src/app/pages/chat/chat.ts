import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { VeraApi } from '../../core/services/vera-api';

interface ChatMessage {
  role: 'user' | 'vera';
  content: string;
  createdAt: Date;
}

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  private veraApi = inject(VeraApi);
  private cdr = inject(ChangeDetectorRef);

  userId = 'user-test-001';
  messages: ChatMessage[] = [];
  input = '';
  isLoading = false;

  onSubmit() {
    const question = this.input.trim();
    if (!question || this.isLoading) return;

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

    this.veraApi.ask(question, this.userId).subscribe({
      next: (res) => {
        // réponse OK (quand ton back marchera)
        this.messages = [
          ...this.messages,
          {
            role: 'vera',
            content: res.answer,
            createdAt: new Date(),
          },
        ];
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
