import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesService, Service } from '../../../services/services.service';
import { ServiceCardComponent } from '../../../../shared/components/service-card/service-card';
import { ReviewFormComponent } from './review-form.component';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ServiceCardComponent, ReviewFormComponent],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private servicesService = inject(ServicesService);
  private cdr = inject(ChangeDetectorRef);
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
        console.log('Services:', this.services);
        console.log('Services length:', this.services.length);
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }
}