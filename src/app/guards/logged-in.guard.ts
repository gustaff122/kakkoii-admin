import { inject } from '@angular/core';
import { Router, UrlTree, CanMatchFn } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { JwtService } from '../services/jwt.service';

export const loggedInGuard: CanMatchFn = (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const jwtService = inject(JwtService);
  const profileService = inject(ProfileService);
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (token) {
    return profileService.getCurrentProfile().pipe(
      map((profile) => {
        if (profile) {
          return true;
        } else {
          jwtService.removeToken();
          return router.createUrlTree([ '/auth' ]);
        }
      }),
      catchError(() => {
        jwtService.removeToken();
        return of(router.createUrlTree([ '/auth' ]));
      }),
    );
  } else {
    jwtService.removeToken();
    return router.createUrlTree([ '/auth' ]);
  }
};