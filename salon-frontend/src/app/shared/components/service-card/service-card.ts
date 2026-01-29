import { Component, Input, OnInit } from '@angular/core';
import { Service, ServicesService } from '../../../features/services/services.service';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-service-card',
  templateUrl: './service-card.html'
})
export class ServiceCardComponent implements OnInit {
 @Input() service!: Service;
  services: any[] = [];
  loading = false;
  error = '';

  constructor(private servicesApi: ServicesService) {}

  ngOnInit() {
    this.fetchServices();
  }

  fetchServices() {
    this.loading = true;

    this.servicesApi.getServices().subscribe({
      next: (res) => {
        this.services = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load services';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
