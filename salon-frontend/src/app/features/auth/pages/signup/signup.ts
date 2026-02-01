import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../../core/auth/auth';
import { TokenService } from '../../../../core/auth/token';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
})
export class Signup {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private tokenService = inject(TokenService);
  private router = inject(Router);

  loading = false;
  errorMessage = '';

  registerForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    this.auth.signup(this.registerForm.getRawValue()).subscribe({
      next: (res) => {
        this.tokenService.setToken(res.data.accessToken);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        this.loading = false;
      },
    });
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}