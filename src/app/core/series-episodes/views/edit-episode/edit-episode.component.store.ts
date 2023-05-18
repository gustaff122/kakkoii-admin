import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { EpisodesService } from '@kakkoii/services/episodes.service';
import { ToastrService } from 'ngx-toastr';

interface EditEpisodeComponentState extends DefaultComponentState {
}

@Injectable()
export class EditEpisodeComponentStore extends DefaultComponentStore<EditEpisodeComponentState> {

  public readonly editEpisode = this.effect((origin$: Observable<{ episode: Omit<SeriesEpisode, 'number'> }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ episode }) => {
        const series = this.activatedRoute.snapshot.data[SERIES];
        const number: number = parseInt(this.activatedRoute.snapshot.params['epNumber']);
        return this.episodesService.patchEpisode(series._id, { ...episode, number }).pipe(
          tapResponse(() => {
            this.patchState({
              loading: false,
            });

            this.toastrService.success('Odcinek został zedytowany');
            this.router.navigate([ '/episodes', series.pseudo ]);
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

  public readonly deleteEpisode = this.effect((origin$: Observable<void>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(() => {
        const series = this.activatedRoute.snapshot.data[SERIES];
        const number: number = parseInt(this.activatedRoute.snapshot.params['epNumber']);

        return this.episodesService.deleteEpisode(series._id, number).pipe(
          tapResponse(() => {
            this.patchState({
              loading: false,
            });
            
            this.toastrService.success('Odcinek został usunięty');
            this.router.navigate([ '/episodes', series.pseudo ]);
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
    private readonly toastrService: ToastrService,
  ) {
    super({
      loading: false,
      error: null,
    });
  }
}