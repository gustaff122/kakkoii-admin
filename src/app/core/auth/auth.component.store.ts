import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { tapResponse } from '@ngrx/component-store';
import { Router } from '@angular/router';
import { JwtService } from '@kakkoii/services/jwt.service';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { AuthService } from '@kakkoii/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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

            this.toastrService.error('Nie udało się zalogować. Sprawdź adres e-mail i hasło.');
          }),
        );
      }),
    );
  });

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly router: Router,
    private readonly toastrService: ToastrService,
  ) {
    super({
      loading: false,
      error: null,
    });
  }
}