import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  login(payload: LoginPayload): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/auth/login`, payload);
  }

  signup(payload: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/auth/signup`, payload);
  }
}
