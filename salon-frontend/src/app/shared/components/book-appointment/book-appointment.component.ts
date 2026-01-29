import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Service } from '../../../features/services/services.service';
import { FormsModule } from '@angular/forms';
import { StaffService, Staff } from '../../../features/staff/staff.service';
import { OnInit } from '@angular/core';

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

  staffList: Staff[] = [];
  filteredStaff: Staff[] = [];
  selectedStaffId = '';

  constructor(private staffService: StaffService) {}

  ngOnInit() {
    this.fetchStaff();
  }

  fetchStaff() {
    this.staffService.getStaff().subscribe({
      next: (res) => {
        this.staffList = res.data;

        // ✅ filter staff who provide this service
        this.filteredStaff = this.staffList.filter(staff =>
          staff.Services.some(s => s.id === this.service.id)
        );
      },
      error: (err) => {
        console.error('Failed to load staff', err);
      }
    });
  }
}

