import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { ResponseEvent } from '../models/response.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  private socket: Socket;
  private dataUpdateSubject = new Subject<ResponseEvent>();
  private connectionStatusSubject = new Subject<boolean>();
  private platformId = inject(PLATFORM_ID);
  private authService = inject(AuthService);

  constructor() {
    // Récupérer le token JWT pour l'authentification WebSocket
    const token = this.authService.getToken();

    // Connexion au WebSocket backend avec authentification
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      autoConnect: false,
      auth: {
        token: token
      }
    });

    // Écouter les événements de mise à jour
    this.socket.on('data:update', (data: ResponseEvent) => {
      console.log('📡 Nouvelle donnée reçue:', data);
      this.dataUpdateSubject.next(data);
    });

    // Gestion de la connexion
    this.socket.on('connect', () => {
      console.log('✅ WebSocket connecté');
      this.connectionStatusSubject.next(true);
    });

    this.socket.on('disconnect', () => {
      console.log('❌ WebSocket déconnecté');
      this.connectionStatusSubject.next(false);
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Erreur de connexion WebSocket:', error);
      this.connectionStatusSubject.next(false);
    });
  }

  // Se connecter au WebSocket
  connect(): void {
    // Vérifier qu'on est côté navigateur
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (!this.socket.connected) {
      // Mettre à jour le token avant de se connecter
      const token = this.authService.getToken();
      if (token) {
        this.socket.auth = { token };
      }
      this.socket.connect();
    }
  }

  // Se déconnecter du WebSocket
  disconnect(): void {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  // Observable pour écouter les mises à jour en temps réel
  onDataUpdate(): Observable<ResponseEvent> {
    return this.dataUpdateSubject.asObservable();
  }

  // Observable pour écouter les changements d'état de connexion
  onConnectionStatusChange(): Observable<boolean> {
    return this.connectionStatusSubject.asObservable();
  }

  // Vérifier l'état de la connexion
  isConnected(): boolean {
    return this.socket.connected;
  }
}
