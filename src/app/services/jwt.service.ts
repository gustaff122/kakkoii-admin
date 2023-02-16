import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {

  public token: string | null;

  constructor() {
    this.token = localStorage.getItem('token') || null;
  }

  public saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  public removeToken(): void {
    localStorage.removeItem('token');
    this.token = null;
  }
}
