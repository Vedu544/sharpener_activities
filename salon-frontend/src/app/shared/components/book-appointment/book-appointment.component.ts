import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Service } from '../../../features/services/services.service';
import { StaffService, Staff } from '../../../features/staff/staff.service';
import { BookingService } from '../../../features/appointments/booking.service';
import { PaymentsService } from '../../../features/payments/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-appointment.component.html',
})
export class BookAppointmentComponent implements OnInit {
  @Input() service!: Service;
  @Output() close = new EventEmitter<void>();

  appointmentDate = '';
  appointmentTime = '';
  selectedStaffId = '';
  

  staffList: Staff[] = [];
  filteredStaff: Staff[] = [];

  loading = false;

  constructor(
    private staffService: StaffService,
    private bookingService: BookingService,
    private paymentsService: PaymentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchStaff();
  }

  // ======================
  // STAFF
  // ======================
  fetchStaff() {
    this.staffService.getStaff().subscribe({
      next: (res) => {
        this.staffList = res.data;

        this.filteredStaff = this.staffList.filter((staff) =>
          staff.Services.some((s) => s.id === this.service.id)
        );
      },
      error: (err) => {
        console.error('Failed to load staff', err);
      },
    });
  }

  // ======================
  // FORM
  // ======================
  isFormValid(): boolean {
    return (
      !!this.appointmentDate &&
      !!this.appointmentTime &&
      !!this.selectedStaffId &&
      !!this.service.name
    );
  }

  // ======================
  // BOOK APPOINTMENT
  // ======================
  book() {
    if (!this.isFormValid()) return;

    this.loading = true;

    const payload = {
      serviceId: this.service.id,
      staffId: this.selectedStaffId,
      serviceName: this.service.name,
      appointmentDate: this.appointmentDate,
      appointmentTime: this.appointmentTime,
    };

    this.bookingService.bookAppointment(payload).subscribe({
      next: (res) => {
        const appointmentId = res.data.id;
        console.log('Appointment booked:', appointmentId);

        this.startPayment(appointmentId);
      },
      error: (err) => {
        console.error('Booking failed', err);
        this.loading = false;
      },
    });
  }

  // ======================
  // PAYMENT
  // ======================
  startPayment(appointmentId: string) {
    this.paymentsService.createPayment({
      appointmentId,
      amount: Number(this.service.price), // 👈 derived from service
      method: 'UPI',
    }).subscribe({
      next: (res) => {
        this.openCashfree(res.data.paymentSessionId);
      },
      error: (err) => {
        console.error('Payment init failed', err);
        this.loading = false;
      },
    });
  }

  openCashfree(paymentSessionId: string) {
    const cashfree = (window as any).Cashfree({
      mode: 'sandbox', // change to 'production' later
    });

    cashfree.checkout({
      paymentSessionId,
    }).then((result: any) => {
      if (result?.paymentDetails?.paymentId) {
        this.verifyPayment(result.paymentDetails.paymentId);
      }
    });
  }

  verifyPayment(paymentId: string) {
    this.paymentsService.verifyPayment(paymentId).subscribe({
      next: () => {
        alert('🎉 Appointment booked successfully!');
        this.loading = false;
        this.close.emit();
        this.router.navigate(['/your-appointments']);
      },
      error: (err) => {
        console.error('Payment verification failed', err);
        this.loading = false;
      },
    });
  }
}
