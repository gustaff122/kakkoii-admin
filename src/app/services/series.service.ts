import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@kakkoii/env/environment';
import { Series } from '@kakkoii/interfaces/series';
import { Paginator } from '@kakkoii/interfaces/paginator';
import { SeriesListFilters } from '@kakkoii/interfaces/series-list-filters';

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

  public getSeriesList(paginator: Paginator, filters?: Partial<SeriesListFilters>): Observable<{ series: Series[], totalCount: number }> {
    let params = new HttpParams().set('page', paginator.page).set('limit', paginator.limit);

    if (filters?.name) {
      params = params.append('name', filters.name);
    }

    if (filters?.status) {
      params = params.append('status', filters.status);
    }

    if (filters?.type) {
      params = params.append('type', filters.type);
    }

    if (filters?.tags) {
      filters.tags.forEach(tag => {
        params = params.append('tags', tag);
      });
    }

    if (filters?.season) {
      params = params.append('season', filters.season);
    }

    if (filters?.year) {
      params = params.append('year', filters.year);
    }

    return this.httpClient.get<{ series: Series[], totalCount: number }>(`${this.API_URL}/series`, { params });
  }

  public getSeries(seriesId: string): Observable<Series> {
    return this.httpClient.get<Series>(`${this.API_URL}/series/${seriesId}`);
  }

  public getSeriesByPseudo(seriesPseudo: string): Observable<Series> {
    return this.httpClient.get<Series>(`${this.API_URL}/series/pseudo/${seriesPseudo}`);
  }

  public patchSeries(seriesId: string, data: FormData): Observable<Series> {
    return this.httpClient.patch<Series>(`${this.API_URL}/series/${seriesId}`, data);
  }
}
