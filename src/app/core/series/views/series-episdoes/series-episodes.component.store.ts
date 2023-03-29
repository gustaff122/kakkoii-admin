import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '../../../../utils/default.component.store';
import { Series } from '../../../../interfaces/series';
import { SeriesService } from '../../../../services/series.service';
import { ActivatedRoute } from '@angular/router';
import { SeriesEpisode } from '../../../../interfaces/series-episode';
import { SeriesLink } from '../../../../interfaces/series-link';
import { generateUuid } from '../../../../utils/generate-uuid';

interface SeriesComponentState extends DefaultComponentState {
  series: Series | null;
  selectedEpisode: number | null;
}

@Injectable()
export class SeriesEpisodesComponentStore extends DefaultComponentStore<SeriesComponentState> {

  public readonly series$: Observable<Series | null> = this.select((state) => state.series);
  public readonly selectedEpisodeNumber$: Observable<number | null> = this.select((state) => state.selectedEpisode);
  public readonly selectedEpisodeMirrors$: Observable<SeriesLink[]> = this.select((state) => state.series.episodes.find(e => e.number == state.selectedEpisode).links);
  public readonly seriesTitleJp$: Observable<string> = this.select((state) => state.series.titleJp);
  public readonly seriesEpisodes$: Observable<SeriesEpisode[]> = this.select((state) => state.series.episodes.sort((a, b) => a.number - b.number));

  public readonly getSeries = this.effect((origin$: Observable<void>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(() => {
        const seriesId = this.activatedRoute.snapshot.params['id'];
        return this.seriesService.getSeries(seriesId).pipe(
          tapResponse((series) => {
            this.patchState({
              series,
              loading: false,
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

  public readonly addEpisode = this.effect((origin$: Observable<{ episode: SeriesEpisode }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ episode }) => {
        const seriesId = this.activatedRoute.snapshot.params['id'];
        return this.seriesService.addSeriesEpisode(seriesId, episode).pipe(
          tapResponse((series) => {
            this.patchState({
              series,
              loading: false,
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

  public readonly editEpisode = this.effect((origin$: Observable<{ episode: SeriesEpisode }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ episode }) => {
        const seriesId = this.activatedRoute.snapshot.params['id'];
        return this.seriesService.patchSeriesEpisode(seriesId, episode).pipe(
          tapResponse((series) => {
            this.patchState({
              series,
              loading: false,
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

  public readonly deleteEpisode = this.effect((origin$: Observable<{ epNumber: number }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ epNumber }) => {
        const seriesId = this.activatedRoute.snapshot.params['id'];
        return this.seriesService.deleteSeriesEpisode(seriesId, epNumber).pipe(
          tapResponse((series) => {
            this.patchState({
              series,
              loading: false,
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

  public readonly addMirror = this.effect((origin$: Observable<{ mirror: Omit<SeriesLink, 'id'> }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ mirror }) => {
        const seriesId = this.activatedRoute.snapshot.params['id'];
        const mirrorWithId: SeriesLink = { id: generateUuid(), ...mirror };
        const epNumber = this.get().selectedEpisode;

        return this.seriesService.addSeriesMirror(seriesId, epNumber, mirrorWithId).pipe(
          tapResponse((link) => {
            this.patchState((state) => {
              return {
                ...state,
                series: {
                  ...state.series,
                  episodes: state.series.episodes.map((item) => {
                    if (item.number == epNumber) {
                      return { ...item, links: [ link, ...item.links ] };
                    } else {
                      return item;
                    }
                  }),
                },
                loading: false,
              };
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

  public readonly deleteEpisodeMirror = this.updater((state, { mirrorId }: { mirrorId: string }): SeriesComponentState => {
    const epNumber = this.get().selectedEpisode;

    return {
      ...state,
      series: {
        ...state.series,
        episodes: state.series.episodes.map((item) => {
          if (item.number == epNumber) {
            return { ...item, links: item.links.filter((link) => link.id != mirrorId) };
          } else {
            return item;
          }
        }),
      },
    };
  });

  public readonly selectEpisode = this.updater((state, { selectedEpisode }: { selectedEpisode: number }): SeriesComponentState => {
    return {
      ...state,
      selectedEpisode,
    };
  });

  constructor(
    private readonly seriesService: SeriesService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    super({
      series: null,
      selectedEpisode: null,
      loading: false,
      error: null,
    });
  }
}