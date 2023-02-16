import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '../../utils/default.component.store';
import { AuthService } from '../../services/auth.service';
import { tapResponse } from '@ngrx/component-store';
import { JwtService } from '../../services/jwt.service';
import { Router } from '@angular/router';

interface AuthComponentState extends DefaultComponentState {
}

@Injectable()
export class AuthComponentStore extends DefaultComponentStore<AuthComponentState> {

  public readonly login = this.effect((origin$: Observable<{ email: string, password: string }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      switchMap(({ email, password }) => {
        return this.authService.login(email, password).pipe(
          tap(({ token }) => {
            this.jwtService.saveToken(token);
            this.router.navigate([ 'series' ]);
          }),
          tapResponse(() => {
            this.patchState({
              loading: false,
              error: null,
            });
          }, ({ error }: HttpErrorResponse) => {
            this.patchState({
              loading: false,
              error,
            });
          }),
        );
      }),
    );
  });

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly router: Router,
  ) {
    super({
      loading: false,
      error: null,
    });
  }
}