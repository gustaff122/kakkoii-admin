import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile';
import { environment } from '@kakkoii/env/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private readonly API_URL: string = environment.apiUrl;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public getCurrentProfile(): Observable<Profile> {
    return this.httpClient.get<Profile>(`${this.API_URL}/`);
  }
}
