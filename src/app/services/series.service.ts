import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Series } from '../interfaces/series';
import { environment } from 'src/environments/environment';
import { Paginator } from '../interfaces/paginator';
import { SeriesEpisode } from '../interfaces/series-episode';
import { SeriesLink } from '../interfaces/series-link';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {

  private readonly API_URL: string = environment.apiUrl;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public addNewSeries(data: FormData): Observable<Series> {
    return this.httpClient.post<Series>(`${this.API_URL}/series`, data);
  }

  public getSeriesList(paginator: Paginator, filters?: Partial<{ name: string }>): Observable<{ series: Series[], totalCount: number }> {
    let params = new HttpParams().set('page', paginator.page).set('limit', paginator.limit);

    if (filters?.name) {
      params = params.append('name', filters.name);
    }

    return this.httpClient.get<{ series: Series[], totalCount: number }>(`${this.API_URL}/series`, { params });
  }

  public getSeries(seriesId: string): Observable<Series> {
    return this.httpClient.get<Series>(`${this.API_URL}/series/${seriesId}`);
  }

  public patchSeries(seriesId: string, data: FormData): Observable<Series> {
    return this.httpClient.patch<Series>(`${this.API_URL}/series/${seriesId}`, data);
  }

  public addSeriesEpisode(seriesId: string, addEpisodeDto: SeriesEpisode): Observable<Series> {
    return this.httpClient.put<Series>(`${this.API_URL}/series/${seriesId}`, addEpisodeDto);
  }

  public patchSeriesEpisode(seriesId: string, editEpisodeDto: SeriesEpisode): Observable<Series> {
    return this.httpClient.put<Series>(`${this.API_URL}/series/${seriesId}/edit`, editEpisodeDto);
  }

  public deleteSeriesEpisode(seriesId: string, episodeNumber: number): Observable<Series> {
    return this.httpClient.delete<Series>(`${this.API_URL}/series/${seriesId}/${episodeNumber}`);
  }

  public addSeriesMirror(seriesId: string, epNumber: number, mirror: SeriesLink): Observable<SeriesLink> {
    return this.httpClient.put<SeriesLink>(`${this.API_URL}/series/mirror/${seriesId}/${epNumber}`, mirror);
  }

  public deleteSeriesMirror(seriesId: string, epNumber: number, mirrorId: string): Observable<SeriesLink> {
    return this.httpClient.delete<SeriesLink>(`${this.API_URL}/series/mirror/${seriesId}/${epNumber}/${mirrorId}`);
  }
}
