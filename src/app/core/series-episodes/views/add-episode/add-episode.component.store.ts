import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { EpisodesService } from '@kakkoii/services/episodes.service';

interface AddEpisodeComponentState extends DefaultComponentState {
}

@Injectable()
export class AddEpisodeComponentStore extends DefaultComponentStore<AddEpisodeComponentState> {

  public readonly addEpisode = this.effect((origin$: Observable<{ episode: SeriesEpisode }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ episode }) => {
        const seriesId = this.activatedRoute.snapshot.data[SERIES]._id;
        const seriesPseudo = this.activatedRoute.snapshot.params['seriesPseudo'];

        return this.episodesService.addEpisode(seriesId, episode).pipe(
          tapResponse(() => {
            this.patchState({
              loading: false,
            });

            this.router.navigate([ '/episodes', seriesPseudo ]);
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
    private readonly router: Router,
  ) {
    super({
      loading: false,
      error: null,
    });
  }
}