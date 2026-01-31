import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface BookAppointmentPayload {
  serviceId: string;
  staffId: string;
  appointmentDate: string;
  appointmentTime: string;
}

export interface BookAppointmentResponse {
  success: boolean;
  message: string;
  data: {
    id: string; // appointmentId
  };
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private http = inject(HttpClient);

  bookAppointment(payload: BookAppointmentPayload) {
    return this.http.post<BookAppointmentResponse>(
      'http://localhost:8000/appointments/book',
      payload
    );
  }
}
