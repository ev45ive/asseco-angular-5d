import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { ErrorHandler, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import {
  EMPTY,
  Observable,
  catchError,
  pipe,
  retry,
  throwError,
  timer,
} from 'rxjs';
import { API_URL } from '../tokens';
import { NotificationsService } from '../services/notifications.service';

// Standalone
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const oauth = inject(OAuthService);
  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${oauth.getAccessToken()}`,
    },
  });
  return next(req);
};

// NgModule
export class AuthInterceptor implements HttpInterceptor {
  oauth = inject(OAuthService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    //
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.oauth.getAccessToken()}`,
      },
    });

    return next.handle(req);
  }
}

export const URLInterceptor: HttpInterceptorFn = (req, next) => {
  const api_url = inject(API_URL);

  if (!req.url.match(/^https?:/))
    req = req.clone({
      url: api_url + req.url,
    });

  return next(req);
};

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: OpenTelemetry - Sentry, Grafana, Splunk, DataDog?
  const errorHandler = inject(ErrorHandler);

  return next(req).pipe(
    exponentialBackoffRetry(3),

    catchError((error, catchedObservable) => {
      errorHandler.handleError(error);

      if (!(error instanceof HttpErrorResponse))
        return throwError(() => new Error('Unexpected error'));

      if (!error.status)
        // TODO: Retry when connection returns
        return throwError(() => new Error('No internet connection'));

      // TODO:
      // navigator.connection.addEventListener('change',console.log)

      return throwError(() => new Error(error.error.error.message));
    }),
    catchAndNotify(),
  );
};

export const catchAndNotify = <T>() => {
  const notifications = inject(NotificationsService);

  return catchError<T, Observable<T>>((error) => {
    notifications.error(error);
    return EMPTY;
  });
};

// try{
//   czasemDziala()
// }
// catch(e){
//   Logger.log(e)
//   sprobujponownie()
//   wyswietlkomunikat()
//   etc()
// }

// Chain of responsibility pattern (Sztafeta)

// obs = HttpClient.get(req) => HttpClient.handler.next()

// HttpClient.handler = InterceptorA
// InterceptorA.handler = InterceptorB
// InterceptorB.handler = InterceptorC

// InterceptorC.handler = HttpHandler ( req => obs)

// obs.subscribe()

export const exponentialBackoffRetry = <T>(maxRetries = 3) =>
  pipe<Observable<T>, Observable<T>>(
    // map(), costam(),
    retry({
      delay(error: unknown, retryCount) {
        const RETRY_STATUS_CODES = [408, 413, 429, 500, 502, 503, 504, 0];

        if (
          error instanceof HttpErrorResponse &&
          RETRY_STATUS_CODES.includes(error.status) &&
          retryCount <= maxRetries
        )
          return timer(500 * retryCount ** 2);

        return throwError(() => error);
      },
    }),
  );
