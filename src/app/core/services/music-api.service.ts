import { Injectable, inject } from '@angular/core';
import mockAlbums from '../mocks/mockAlbums';
import { API_URL } from '../tokens';
import { HttpClient } from '@angular/common/http';
import { AlbumResponse, AlbumSearchResponse } from '../model/Album';
import {
  EMPTY,
  Observable,
  Subscription,
  catchError,
  from,
  map,
  of,
  throwError,
} from 'rxjs';
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

    return this.http
      .get<AlbumSearchResponse>(this.api_url + 'search', {
        headers: {
          Authorization: `Bearer ${this.oauth.getAccessToken()}`,
        },
        params: {
          query,
          type: 'album',
        },
      })
      .pipe(
        map((res) => res.albums.items),
        catchError((error, catchedObservable) => {
          // return from([]); // --|>
          // return []; // --|>
          // return [mockAlbums, mockAlbums]; // --OO|>
          // return EMPTY // --|>
          // return this.http.get('inny server')

          // Retry:
          // return catchedObservable

          return throwError(() => new Error(error.error.error.message));
        }),
      );
  }
}

// try{
//   czasemDziala()
// }
// catch(e){
//   Logger.log(e)
//   sprobujponownie()
//   wyswietlkomunikat()
//   etc()
// }
