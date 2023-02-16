import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authJwtToken = localStorage.getItem('token');

    if (authJwtToken) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authJwtToken}`),
      });

      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
