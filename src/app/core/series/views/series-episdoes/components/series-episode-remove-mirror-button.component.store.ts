import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '../../../../../utils/default.component.store';
import { SeriesService } from '../../../../../services/series.service';
import { ActivatedRoute } from '@angular/router';

interface SeriesEpisodeRemoveMirrorButtonComponentState extends DefaultComponentState {
}

@Injectable()
export class SeriesEpisodeRemoveMirrorButtonComponentStore extends DefaultComponentStore<SeriesEpisodeRemoveMirrorButtonComponentState> {

  public readonly deleteMirror = this.effect((origin$: Observable<{ epNumber: number, mirrorId: string, callbackFn: () => void }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ epNumber, mirrorId, callbackFn }) => {
        const seriesId = this.activatedRoute.snapshot.params['id'];
        return this.seriesService.deleteSeriesMirror(seriesId, epNumber, mirrorId).pipe(
          tapResponse(() => {
            this.patchState({
              loading: false,
            });

            callbackFn();
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
    private readonly seriesService: SeriesService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    super({
      loading: false,
      error: null,
    });
  }
}