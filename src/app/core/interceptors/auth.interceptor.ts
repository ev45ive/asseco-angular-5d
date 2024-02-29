import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

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
