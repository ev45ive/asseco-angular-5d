import { Component, PLATFORM_ID, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root, .placki[sos=malinowy]',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

  /* 
  // Component takes over NgModule responsibility
    standalone: true,
    import:[CoreModule,AppRoutingModule, SharedModule],
    providers:[provideClientHydration()]
  */
})
export class AppComponent {
  title = 'asseco';

  oauth = inject(OAuthService);
  platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    
    if (isPlatformBrowser(this.platformId)) {
      this.oauth.configure(environment.authConfig);
      this.oauth.tryLogin();
    }
  }

  login() {
    this.oauth.initImplicitFlow(); // TODO: popup!
  }
}

// new AppComponent() ??
