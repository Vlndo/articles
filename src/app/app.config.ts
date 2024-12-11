import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { finalize } from 'rxjs';
import {
  authInterceptor,
  backendInterceptor,
  errorInterceptor,
} from '../tools/backend-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // détecter les changements de valeurs des variables
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ), // détecte les changements dans l'URL
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          document.body.classList.add('cursor-wait');
          return next(req).pipe(
            finalize(() => document.body.classList.remove('cursor-wait'))
          );
        },
        backendInterceptor,
        authInterceptor,
        errorInterceptor,
      ])
    ),
  ],
};
