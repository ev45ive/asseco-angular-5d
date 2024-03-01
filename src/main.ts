import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  bootstrapApplication,
  provideClientHydration,
} from '@angular/platform-browser';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { AppComponent } from './app/app.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import routes from './app/app-routing.module';
import {
  URLInterceptor,
  errorInterceptor,
} from './app/core/interceptors/auth.interceptor';

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch(err => console.error(err));

// Standalone
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([URLInterceptor, errorInterceptor]),
      withInterceptorsFromDi(),
    ),
    provideRouter(routes),
    provideOAuthClient(),
  ],
});
