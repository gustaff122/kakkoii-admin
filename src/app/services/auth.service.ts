import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@kakkoii/env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly API_URL: string = environment.apiUrl;

  constructor(
    private readonly httpClient: HttpClient,
  ) {
  }

  public login(email: string, password: string): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(`${this.API_URL}/auth/login`, { email, password });
  }

}
