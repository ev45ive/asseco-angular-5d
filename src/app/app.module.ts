import { ApplicationRef, DoBootstrap, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,

    OAuthModule.forRoot(),
  ],
  providers: [
    provideClientHydration(),

    // Override:
    // {
    //   provide: API_URL,
    //   useValue: 'http://demoapi.local/',
    // },
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
