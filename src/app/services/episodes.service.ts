import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Series } from '@kakkoii/interfaces/series';
import { SeriesLink } from '@kakkoii/interfaces/series-link';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { Paginator } from '@kakkoii/interfaces/paginator';
import { environment } from '@kakkoii/env/environment';
import { DirectionType } from '@kakkoii/types/direction-type';

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {

  private readonly API_URL: string = environment.apiUrl;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getEpisodes(seriesPseudo: string, paginator: Paginator, direction: DirectionType): Observable<{ episodes: SeriesEpisode[], totalCount: number }> {
    let params = new HttpParams().set('page', paginator.page).set('limit', paginator.limit).set('direction', direction);

    return this.httpClient.get<{ episodes: SeriesEpisode[], totalCount: number }>(`${this.API_URL}/episodes/${seriesPseudo}`, { params });
  }

  public getEpisode(seriesPseudo: string, epNumber: number): Observable<SeriesEpisode> {
    return this.httpClient.get<SeriesEpisode>(`${this.API_URL}/episodes/${seriesPseudo}/${epNumber}`);
  }

  public addEpisode(seriesId: string, addEpisodeDto: SeriesEpisode): Observable<SeriesEpisode> {
    return this.httpClient.post<SeriesEpisode>(`${this.API_URL}/episodes/${seriesId}`, addEpisodeDto);
  }

  public patchEpisode(seriesId: string, editEpisodeDto: SeriesEpisode): Observable<SeriesEpisode> {
    return this.httpClient.patch<SeriesEpisode>(`${this.API_URL}/episodes/${seriesId}`, editEpisodeDto);
  }

  public deleteEpisode(seriesId: string, episodeNumber: number): Observable<Series> {
    return this.httpClient.delete<Series>(`${this.API_URL}/episodes/${seriesId}/${episodeNumber}`);
  }

  public addEpisodeMirror(seriesId: string, epNumber: number, mirror: SeriesLink): Observable<SeriesLink> {
    return this.httpClient.put<SeriesLink>(`${this.API_URL}/episodes/${seriesId}/${epNumber}`, mirror);
  }

  public deleteEpisodeMirror(seriesId: string, epNumber: number, mirrorId: string): Observable<SeriesLink> {
    return this.httpClient.delete<SeriesLink>(`${this.API_URL}/episodes/${seriesId}/${epNumber}/${mirrorId}`);
  }
}
