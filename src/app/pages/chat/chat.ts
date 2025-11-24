import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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

  userId = "user-test-001"; // User de test
  messages: ChatMessage[] = [];
  input = "";
  isLoading = false;
  error: string | null = null;

  onSubmit() {
    const question = this.input.trim();
    if (!question || this.isLoading) return;

    // On reset l'erreur éventuelle + on vide le champ
    this.error = null;
    this.input = '';

    // On ajoute le message de l'utilisateur dans le chat
    this.messages.push({
      role: 'user',
      content: question,
      createdAt: new Date(),
    });

    // On passe en "chargement"
    this.isLoading = true;

    // On appelle ton service qui parle au back Nest
    this.veraApi.ask(question, this.userId).subscribe({
      next: (res) => {
        // res.answer vient de ton backend
        this.messages.push({
          role: 'vera',
          content: res.answer,
          createdAt: new Date(),
        });
        this.isLoading = false;
      },
      error: () => {
        this.error = "Oups, VERA n'arrive pas à répondre pour le moment.";
        this.isLoading = false;
      },
    });
  }
}
