import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { EpisodesService } from '@kakkoii/services/episodes.service';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';

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
        const seriesId = this.activatedRoute.snapshot.data[SERIES]._id;

        return this.episodesService.deleteEpisodeMirror(seriesId, epNumber, mirrorId).pipe(
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
    private readonly episodesService: EpisodesService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    super({
      loading: false,
      error: null,
    });
  }
}