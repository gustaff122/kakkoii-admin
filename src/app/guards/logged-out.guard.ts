import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

export const loggedOutGuard: CanMatchFn = (): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (!token) {
    return true;
  } else {
    return router.navigateByUrl('/browser');
  }
};