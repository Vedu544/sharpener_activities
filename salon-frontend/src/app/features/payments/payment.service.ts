import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface CreatePaymentPayload {
  appointmentId: string;
  amount: number;
  method: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentsService {
  private http = inject(HttpClient);

  createPayment(payload: CreatePaymentPayload) {
    return this.http.post<any>(
      'http://localhost:8000/payments/create',
      payload
    );
  }

  verifyPayment(paymentId: string) {
    return this.http.post<any>(
      'http://localhost:8000/payments/verify',
      { paymentId }
    );
  }
}
