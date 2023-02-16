import { Injectable } from '@angular/core';
import { Router, UrlTree, CanLoad } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanLoad {

  constructor(
    private readonly router: Router,
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
  ) {
  }

  public canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token');

    if (token) {
      return this.profileService.getCurrentProfile().pipe(
        map((profile) => {
          if (profile) {
            return true;
          } else {
            this.jwtService.removeToken();
            return this.router.createUrlTree([ '/auth' ]);
          }
        }),
        catchError(() => {
          this.jwtService.removeToken();
          return of(this.router.createUrlTree([ '/auth' ]));
        }),
      );
    } else {
      this.jwtService.removeToken();
      return this.router.createUrlTree([ '/auth' ]);
    }
  }
}