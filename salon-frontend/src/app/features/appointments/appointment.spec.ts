import { TestBed } from '@angular/core/testing';

import { Appointment } from './appointment.service';

describe('Appointment', () => {
  let service: Appointment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Appointment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
