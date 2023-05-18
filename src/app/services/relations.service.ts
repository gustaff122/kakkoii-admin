import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeriesRelationComplex } from '@kakkoii/interfaces/series-relation-complex';
import { SeriesRelation } from '@kakkoii/interfaces/series-relation';
import { environment } from '@kakkoii/env/environment';

@Injectable({
  providedIn: 'root',
})
export class RelationsService {

  private readonly API_URL: string = environment.apiUrl;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getSeriesRelations(seriesId: string): Observable<SeriesRelationComplex[]> {
    return this.httpClient.get<SeriesRelationComplex[]>(`${this.API_URL}/relations/${seriesId}`);
  }

  public getRelations(): Observable<{ relations: SeriesRelationComplex[], totalCount: number }> {
    return this.httpClient.get<{ relations: SeriesRelationComplex[], totalCount: number }>(`${this.API_URL}/relations`);
  }

  public addRelation(series1Id: string, firstRelatedToSecond: string, series2Id: string): Observable<SeriesRelation> {
    return this.httpClient.post<SeriesRelation>(`${this.API_URL}/relations`, { series1Id, firstRelatedToSecond, series2Id });
  }

  public removeRelation(series1Id: string, series2Id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/relations/${series1Id}/${series2Id}`);
  }
}
