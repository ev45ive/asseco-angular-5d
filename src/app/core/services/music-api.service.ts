import { ErrorHandler, Injectable, inject } from '@angular/core';
import mockAlbums from '../mocks/mockAlbums';
import { API_URL } from '../tokens';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AlbumResponse, AlbumSearchResponse } from '../model/Album';
import {
  EMPTY,
  Observable,
  Subscription,
  catchError,
  from,
  map,
  of,
  pipe,
  retry,
  switchMap,
  throwError,
  timer,
} from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { time } from 'console';

@Injectable({
  providedIn: 'root',
})
export class MusicAPIService {
  http = inject(HttpClient);

  search(query = '') {
    return this.http.get<AlbumSearchResponse>('search', {
        params: {
          query,
          type: 'album',
        },
      })
      .pipe(map((res) => res.albums.items));
  }
}
