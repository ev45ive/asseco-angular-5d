import { ApplicationRef, DoBootstrap, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import {
  URLInterceptor,
  authInterceptor,
  errorInterceptor,
} from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // HttpClientModule, // replace provideHttpClient(...)
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,

    OAuthModule.forRoot(),
  ],
  providers: [
    provideClientHydration(),

  // NG02801: Angular detected that `HttpClient` is not configured to use 
  // `fetch` APIs. It's strongly recommended to enable `fetch` for applications that 
  // use Server-Side Rendering for better performance and compatibility. 
  // To enable `fetch`, add the `withFetch()` to the `provideHttpClient()` 
  // call at the root of the application.

    provideHttpClient(
      withFetch(),
      withInterceptors([URLInterceptor, errorInterceptor]),
      withInterceptorsFromDi(), // use HTTP_INTERCEPTORS - class AuthInterceptor
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// export class AppModule implements DoBootstrap {
//   ngDoBootstrap(appRef: ApplicationRef): void {
//     // appRef.tick()
//     const comp = appRef.bootstrap(AppComponent, 'app-root');
//     // comp.destory()
//   }
// }
