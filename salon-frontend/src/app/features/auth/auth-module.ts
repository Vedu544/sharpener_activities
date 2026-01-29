import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login')
            .then(m => m.Login)
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./pages/signup/signup')
            .then(m => m.Signup)
      }
    ])
  ]
})
export class AuthModule {}
