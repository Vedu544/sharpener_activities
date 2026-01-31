import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home/home').then(m => m.HomeComponent),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then(m => m.authRoutes),
  },
  {
    path: 'your-appointments',
    loadComponent: () =>
      import('./features/appointments/pages/your-appointments/your-appointments.component').then(m => m.YourAppointmentsComponent),
  },
];
