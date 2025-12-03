// app.module.ts (Angular)

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Module HTTP Angular → permet d'utiliser HttpClient dans toute l'app
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



import { AuthTokenInterceptor } from './auth-token.interceptor'; // chemin à adapter

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // 🔹 Active HttpClient pour les appels vers le backend Nest
    // AppRoutingModule,
  ],
  providers: [
    /**
     * Interceptor global pour ajouter automatiquement le header Authorization: Bearer <token>
     * à chaque requête HTTP sortante (si un token est présent dans le stockage).
     */
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
