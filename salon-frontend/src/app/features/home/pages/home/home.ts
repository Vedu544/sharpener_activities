import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesService, Service } from '../../../services/services.service';
import { ServiceCardComponent } from '../../../../shared/components/service-card/service-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  private servicesService = inject(ServicesService);

  services: Service[] = [];
  loading = false;

  ngOnInit(): void {
    this.fetchServices();
  }

  fetchServices() {
    this.loading = true;

    this.servicesService.getServices().subscribe({
      next: (res) => {
        this.services = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
