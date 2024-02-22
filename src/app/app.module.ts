import { ApplicationRef, DoBootstrap, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule{}

// export class AppModule implements DoBootstrap {
//   ngDoBootstrap(appRef: ApplicationRef): void {
//     // appRef.tick()
//     const comp = appRef.bootstrap(AppComponent, 'app-root');
//     // comp.destory()
//   }
// }
