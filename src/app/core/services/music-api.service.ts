import { Injectable, inject } from '@angular/core';
import mockAlbums from '../mocks/mockAlbums';
import { API_URL } from '../tokens';
import { HttpClient } from '@angular/common/http';
import { AlbumResponse, AlbumSearchResponse } from '../model/Album';
import { Observable, Subscription } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class MusicAPIService {
  api_url = inject(API_URL);
  http = inject(HttpClient);
  oauth = inject(OAuthService);

  search(query = '') {
    console.log('Searching.... ', this.api_url, query);

    // RECIPE:
    return this.http.get<AlbumSearchResponse>(this.api_url + 'search', {
      headers: {
        Authorization: `Bearer ${this.oauth.getAccessToken()}`,
      },
      params: {
        query,
        type: 'album',
      },
      // reportProgress: true 
    }).pipe(
      // Krok 2
      // Krok 3
      // Krok 4
    )
  }
}
