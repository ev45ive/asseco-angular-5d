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
import { NotificationsComponent } from './core/notifications/notifications/notifications.component';

@NgModule({
  declarations: [AppComponent],
  providers: [
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([URLInterceptor, errorInterceptor]),
      withInterceptorsFromDi(),
    ),
  ],
  bootstrap: [AppComponent],
  imports: [
    // HttpClientModule, // replace provideHttpClient(...)
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    OAuthModule.forRoot(),
    NotificationsComponent,
  ],
})
export class AppModule {}

// export class AppModule implements DoBootstrap {
//   ngDoBootstrap(appRef: ApplicationRef): void {
//     // appRef.tick()
//     const comp = appRef.bootstrap(AppComponent, 'app-root');
//     // comp.destory()
//   }
// }
