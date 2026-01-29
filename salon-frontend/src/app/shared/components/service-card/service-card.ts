import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../../features/services/services.service';
import { BookAppointmentComponent } from '../book-appointment/book-appointment.component';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, BookAppointmentComponent],
  templateUrl: './service-card.html',
})
export class ServiceCardComponent {
  @Input() service!: Service;

  showDialog = signal(false);

  openBooking() {
    this.showDialog.set(true);
  }

  closeBooking() {
    this.showDialog.set(false);
  }
}
