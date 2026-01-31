import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Appointment {
  id: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
}

@Component({
  standalone: true,
  selector: 'app-your-appointments',
  templateUrl: './your-appointments.component.html',
  styleUrls: ['./your-appointments.component.css'],
  imports: [CommonModule, FormsModule],
})
export class YourAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = false;
  
  // Modal states
  showRescheduleModal = false;
  selectedAppointment: Appointment | null = null;
  newDate = '';
  newTime = '';
  rescheduleLoading = false;
  
  // Cancel confirmation
  showCancelConfirm = false;
  appointmentToCancel: Appointment | null = null;
  cancelLoading = false;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.loading = true;
    this.http.get<any>('http://localhost:8000/appointments').subscribe({
      next: (res) => {
        this.appointments = res.data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to fetch appointments', err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Reschedule
  openRescheduleModal(appointment: Appointment) {
    this.selectedAppointment = appointment;
    this.newDate = appointment.appointmentDate;
    this.newTime = appointment.appointmentTime;
    this.showRescheduleModal = true;
    this.cdr.detectChanges();
  }

  closeRescheduleModal() {
    this.showRescheduleModal = false;
    this.selectedAppointment = null;
    this.newDate = '';
    this.newTime = '';
    this.cdr.detectChanges();
  }

  submitReschedule() {
    if (!this.selectedAppointment || !this.newDate || !this.newTime) {
      alert('Please fill in all fields');
      return;
    }

    // Validate date
    const date = new Date(this.newDate);
    if (isNaN(date.getTime())) {
      alert('Invalid date');
      return;
    }

    this.rescheduleLoading = true;
    const appointmentId = this.selectedAppointment.id;

    this.http.put<any>(
      `http://localhost:8000/appointments/${appointmentId}/reschedule`,
      {
        appointmentDate: this.newDate,
        appointmentTime: this.newTime,
      }
    ).subscribe({
      next: (res) => {
        console.log('Rescheduled successfully:', res);
        
        // Update the appointment in the list immediately
        const index = this.appointments.findIndex(a => a.id === appointmentId);
        if (index !== -1) {
          this.appointments[index] = res.data;
        }
        
        this.rescheduleLoading = false;
        this.closeRescheduleModal();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to reschedule', err);
        alert('Failed to reschedule appointment');
        this.rescheduleLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  // Cancel
  openCancelConfirm(appointment: Appointment) {
    this.appointmentToCancel = appointment;
    this.showCancelConfirm = true;
    this.cdr.detectChanges();
  }

  closeCancelConfirm() {
    this.showCancelConfirm = false;
    this.appointmentToCancel = null;
    this.cdr.detectChanges();
  }

  confirmCancel() {
    if (!this.appointmentToCancel) return;

    this.cancelLoading = true;
    const appointmentId = this.appointmentToCancel.id;

    this.http.delete<any>(
      `http://localhost:8000/appointments/${appointmentId}/cancel`
    ).subscribe({
      next: (res) => {
        console.log('Appointment cancelled:', res);
        
        // Remove from list immediately
        this.appointments = this.appointments.filter(a => a.id !== appointmentId);
        
        this.cancelLoading = false;
        this.closeCancelConfirm();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to cancel appointment', err);
        alert('Failed to cancel appointment');
        this.cancelLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  formatTime(time: string): string {
    return time.slice(0, 5);
  }
}