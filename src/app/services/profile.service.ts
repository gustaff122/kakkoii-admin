import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../interfaces/profile';

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
