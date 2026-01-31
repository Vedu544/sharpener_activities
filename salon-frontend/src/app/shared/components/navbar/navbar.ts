
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styles: [`
    /* Navbar Styles - Add to your styles.css if not already there */
  `]
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkAuthStatus();
    // Listen for storage changes (logout from another tab)
    window.addEventListener('storage', () => {
      this.checkAuthStatus();
    });
  }

  checkAuthStatus() {
    const accessToken = localStorage.getItem('accessToken');
    this.isLoggedIn = !!accessToken;
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToAppointments() {
    this.router.navigate(['/your-appointments']);
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}