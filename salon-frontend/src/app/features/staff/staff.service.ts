import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Staff {
  id: string;
  name: string;
  isAvailable: boolean;
  Services: {
    id: string;
    name: string;
  }[];
}

interface StaffResponse {
  success: boolean;
  data: Staff[];
}

@Injectable({ providedIn: 'root' })
export class StaffService {
  private http = inject(HttpClient);

  getStaff() {
    return this.http.get<StaffResponse>('http://localhost:8000/staff');
  }
}
