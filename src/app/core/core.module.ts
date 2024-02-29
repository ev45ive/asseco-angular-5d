import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { API_URL } from './tokens';
import { MusicAPIService } from './services/music-api.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    // Override whole Service???
    // {
    //   provide: HttpClient,
    //   useClass: MyMuchBetterAndAwesomeHttpClient
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    },
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
    // {
    //   provide: MusicAPIService,
    //   useFactory(url: string) {
    //     const api = inject(API_URL);
    //     const s = new MusicAPIService();
    //     // s.setAPIURL(url);
    //     return s;
    //   },
    //   deps: [API_URL],
    // },
    // {
    //   provide: AbstactMusicAPIService,
    //   useClass: SpotifyMusicAPIService
    // },
    // MusicAPIService // useClass
  ],
})
export class CoreModule {}
