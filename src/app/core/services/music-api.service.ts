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
  api_url = inject(API_URL);
  http = inject(HttpClient);
  oauth = inject(OAuthService);
  // TODO: OpenTelemetry - Sentry, Grafana, Splunk, DataDog?
  errorHandler = inject(ErrorHandler);

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
        retry({
          delay(error: unknown, retryCount) {
            const RETRY_STATUS_CODES = [408, 413, 429, 500, 502, 503, 504, 0];

            if (
              error instanceof HttpErrorResponse &&
              RETRY_STATUS_CODES.includes(error.status) &&
              retryCount <= 3
            )
              return timer(500 * retryCount ** 2);

            return throwError(() => error);
          },
        }),
        catchError((error, catchedObservable) => {
          this.errorHandler.handleError(error);

          if (!(error instanceof HttpErrorResponse))
            return throwError(() => new Error('Unexpected error'));

          if (!error.status)
            // TODO: Retry when connection returns
            return throwError(() => new Error('No internet connection'));

          // TODO: 
          // navigator.connection.addEventListener('change',console.log)

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
