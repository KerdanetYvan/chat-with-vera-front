import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { inject as vercelAnalyticsInject } from '@vercel/analytics';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),

    provideAppInitializer(() => {
      // ⚠️ Vercel Analytics ne doit s’exécuter que dans le browser
      if (typeof window !== 'undefined') {
        vercelAnalyticsInject({
          mode: isDevMode() ? 'development' : 'production',
        });
      }
    }),
  ]
};
