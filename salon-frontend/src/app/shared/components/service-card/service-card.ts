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

  serviceImages: string[] = [
    '/assets/haircut.jpg',
    '/assets/spa.jpg',
    '/assets/makeup.jpg',
    '/assets/massage.jpg'
  ];

  @Input() service!: Service;
  @Input() index!: number;

  showDialog = signal(false);

  openBooking() {
    this.showDialog.set(true);
  }

  closeBooking() {
    this.showDialog.set(false);
  }
}

