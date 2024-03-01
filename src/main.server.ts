import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {
  HTTP_INTERCEPTORS,
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
  AuthInterceptor,
  URLInterceptor,
  errorInterceptor,
} from './app/core/interceptors/auth.interceptor';
import { API_URL } from './app/core/tokens';
import { environment } from './environments/environment';

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch(err => console.error(err));

// Standalone
export const bootstrap = () =>
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      provideClientHydration(),
      provideHttpClient(
        withFetch(),
        withInterceptors([URLInterceptor, errorInterceptor]),
        withInterceptorsFromDi(),
      ),
      provideRouter(routes, withComponentInputBinding()),
      provideOAuthClient(),
      {
        provide: API_URL,
        useValue: environment.api_url,
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
      },
    ],
  });

export default bootstrap;
