import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { EpisodesService } from '@kakkoii/services/episodes.service';
import { ActivatedRoute } from '@angular/router';
import { SeriesLink } from '@kakkoii/interfaces/series-link';
import { EPISODE } from '@kakkoii/resolvers/episode-resolver/episode.key';
import { generateUuid } from '@kakkoii/utils/generate-uuid';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';

interface EpisodesListComponentState extends DefaultComponentState {
  links: SeriesLink[];
}

@Injectable()
export class EpisodeMirrorsComponentStore extends DefaultComponentStore<EpisodesListComponentState> {

  public readonly links$: Observable<SeriesLink[]> = this.select((state) => state.links);

  public readonly addMirror = this.effect((origin$: Observable<{ mirror: Omit<SeriesLink, 'id'>, callbackFn: () => void }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ mirror, callbackFn }) => {
        const seriesId = this.activatedRoute.snapshot.data[SERIES]._id;
        const epNumber = this.activatedRoute.snapshot.params['epNumber'];
        const mirrorWithId: SeriesLink = { id: generateUuid(), ...mirror };

        return this.episodesService.addEpisodeMirror(seriesId, epNumber, mirrorWithId).pipe(
          tapResponse((link) => {
            this.patchState((state) => {
              return {
                ...state,
                links: [ ...state.links, link ],
                loading: false,
              };
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

  public readonly deleteEpisodeMirror = this.updater((state, { mirrorId }: { mirrorId: string }): EpisodesListComponentState => {
    return {
      ...state,
      links: state.links.filter(link => link.id !== mirrorId),
    };
  });

  constructor(
    private readonly episodesService: EpisodesService,
    public readonly activatedRoute: ActivatedRoute,
  ) {
    super({
      links: activatedRoute.snapshot.data[EPISODE].links,
      loading: false,
      error: null,
    });
  }
}