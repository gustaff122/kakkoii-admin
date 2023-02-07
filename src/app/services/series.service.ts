import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Series } from '../interfaces/series';
import { environment } from 'src/environments/environment';

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
}
