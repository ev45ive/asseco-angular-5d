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
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

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

    provideHttpClient(
      withInterceptors([]),
      withInterceptorsFromDi(), // use HTTP_INTERCEPTORS
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
