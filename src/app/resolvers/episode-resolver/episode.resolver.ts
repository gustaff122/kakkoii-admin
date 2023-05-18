import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EpisodesService } from '@kakkoii/services/episodes.service';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';

export const episodeResolver: ResolveFn<SeriesEpisode> = (route: ActivatedRouteSnapshot): Observable<SeriesEpisode> | Promise<SeriesEpisode> | SeriesEpisode => {
  const episodesService = inject(EpisodesService);
  const seriesPseudo = route.params['seriesPseudo'];
  const epNumber = route.params['epNumber'];

  return episodesService.getEpisode(seriesPseudo, epNumber).pipe(
    map((episode) => {
      return episode;
    }),
  );
};