import { Injectable } from '@angular/core';
import { CanMatch, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggedOutGuard implements CanMatch {

  constructor(
    private readonly router: Router,
  ) {
  }

  public canMatch(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token');

    if (!token) {
      return true;
    } else {
      return this.router.navigateByUrl('/series');
    }
  }
}