import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Series } from '../interfaces/series';
import { environment } from 'src/environments/environment';
import { Paginator } from '../interfaces/paginator';

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
      params.set('name', filters.name);
    }

    return this.httpClient.get<{ series: Series[], totalCount: number }>(`${this.API_URL}/series`, { params });
  }

  public getSeries(seriesId: string) {
    return this.httpClient.get<Series>(`${this.API_URL}/series/${seriesId}`);
  }
}
