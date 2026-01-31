import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../../reviews/review.service';
import { ServicesService, Service } from '../../../services/services.service';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="mb-3">
      <div class="max-w-2xl mx-auto">
        <!-- Header -->
        <div class="mb-12 text-center">
          <h2 class="text-4xl font-bold mb-4 text-gray-900">Share Your Experience</h2>
          <p class="text-lg text-gray-600">
            Help us improve by sharing your feedback. Your review helps other customers make informed decisions.
          </p>
        </div>

        <!-- Review Card -->
        <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 shadow-lg border border-gray-200">
          <form (ngSubmit)="submitReview()">
            <!-- Service Dropdown -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                Select Service *
              </label>
              <select
                [(ngModel)]="selectedServiceId"
                (change)="onServiceChange()"
                name="service"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                [disabled]="servicesLoading"
              >
                <option value="">Choose a service...</option>
                <option *ngFor="let service of services" [value]="service.id">
                  {{ service.name }}
                </option>
              </select>
            </div>

            <!-- Staff Dropdown -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                Select Staff Member *
              </label>
              <select
                [(ngModel)]="selectedStaffId"
                name="staff"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                [disabled]="!selectedServiceId || staffLoading"
              >
                <option value="">
                  {{ selectedServiceId ? 'Choose staff...' : 'Select service first' }}
                </option>
                <option *ngFor="let staff of filteredStaff" [value]="staff.id">
                  {{ staff.name }}
                </option>
              </select>
            </div>

            <!-- Star Rating -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                Rating *
              </label>
              <div class="flex gap-2">
                <button
                  *ngFor="let star of [1, 2, 3, 4, 5]"
                  type="button"
                  (click)="setRating(star)"
                  class="transition transform hover:scale-110"
                  [class.text-yellow-400]="star <= rating"
                  [class.text-gray-300]="star > rating"
                >
                  <span class="text-4xl">★</span>
                </button>
              </div>
            </div>

            <!-- Review Text -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                Your Review *
              </label>
              <textarea
                [(ngModel)]="comment"
                name="comment"
                rows="5"
                placeholder="Share your experience with this service..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
              ></textarea>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="loading || !isFormValid()"
              class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Submitting...' : 'Submit Review' }}
            </button>

            <!-- Success Message -->
            <div *ngIf="successMessage" class="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              ✓ {{ successMessage }}
            </div>

            <!-- Error Message -->
            <div *ngIf="errorMessage" class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              ✗ {{ errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </section>
  `,
  styleUrl: './review-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewFormComponent implements OnInit {
  private reviewsService = inject(ReviewService);
  private servicesService = inject(ServicesService);
  private cdr = inject(ChangeDetectorRef);

  services: Service[] = [];
  staffList: any[] = [];
  filteredStaff: any[] = [];

  selectedServiceId = '';
  selectedStaffId = '';
  rating = 0;
  comment = '';

  servicesLoading = false;
  staffLoading = false;
  loading = false;

  successMessage = '';
  errorMessage = '';

  ngOnInit(): void {
    this.loadServices();
    this.loadStaff();
  }

  loadServices() {
    this.servicesLoading = true;
    this.servicesService.getServices().subscribe({
      next: (res) => {
        this.services = res.data;
        this.servicesLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load services', err);
        this.servicesLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  loadStaff() {
    this.staffLoading = true;
    this.reviewsService.getStaff().subscribe({
      next: (res) => {
        this.staffList = res.data;
        this.staffLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load staff', err);
        this.staffLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  onServiceChange() {
    this.selectedStaffId = '';
    this.filterStaffByService();
  }

  filterStaffByService() {
    // TODO: This will be replaced with backend logic to get staff for a specific service
    // For now, show all staff
    this.filteredStaff = this.staffList;
    this.cdr.markForCheck();
  }

  setRating(stars: number) {
    this.rating = stars;
  }

  isFormValid(): boolean {
    return (
      this.selectedServiceId.length > 0 &&
      this.selectedStaffId.length > 0 &&
      this.rating > 0 &&
      this.comment.trim().length > 0
    );
  }

  submitReview() {
    if (!this.isFormValid()) {
      this.errorMessage = 'Please fill in all fields';
      this.cdr.markForCheck();
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const payload = {
      serviceId: this.selectedServiceId,
      staffId: this.selectedStaffId,
      rating: this.rating,
      comment: this.comment,
    };

    this.reviewsService.addReview(payload).subscribe({
      next: (res) => {
        this.successMessage = 'Thank you! Your review has been submitted successfully.';
        this.resetForm();
        this.loading = false;
        this.cdr.markForCheck();

        // Clear success message after 5 seconds
        setTimeout(() => {
          this.successMessage = '';
          this.cdr.markForCheck();
        }, 5000);
      },
      error: (err) => {
        console.error('Failed to submit review', err);
        this.errorMessage = err.error?.message || 'Failed to submit review. Please try again.';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  resetForm() {
    this.selectedServiceId = '';
    this.selectedStaffId = '';
    this.rating = 0;
    this.comment = '';
  }
}