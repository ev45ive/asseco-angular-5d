import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));


// Standalone
// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(),
//     provideOAuthClient()
//   ]
// });