import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: string;
  isActive: boolean;
}

export interface ServicesResponse {
  success: boolean;
  message: string;
  data: Service[];
}

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8000/services';

  getServices(): Observable<ServicesResponse> {
    return this.http.get<ServicesResponse>(this.API_URL);
  }
}
