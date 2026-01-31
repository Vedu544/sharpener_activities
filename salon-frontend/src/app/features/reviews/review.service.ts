import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface StaffResponse {
  success: boolean;
  message: string;
  data: Staff[];
}

export interface ReviewPayload {
  serviceId: string;
  staffId: string;
  rating: number;
  comment: string;
}

export interface ReviewResponse {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8000';

  getStaff(): Observable<StaffResponse> {
    return this.http.get<StaffResponse>(`${this.API_URL}/get-staff`);
  }

  addReview(payload: ReviewPayload): Observable<ReviewResponse> {
    return this.http.post<ReviewResponse>(`${this.API_URL}/reviews/add`, payload);
  }
}