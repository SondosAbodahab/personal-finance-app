import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); 
  const authService = inject(AuthService); 
  const router = inject(Router);
  if (token) {
    req = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${token}`
      ),
    });
  }
  return next(req).pipe(
    catchError((error) => {
      // If the error status is 401 (Unauthorized), log the user out
      if (error.status === 401 && error.error?.error === 'Invalid token') {
        authService.logout(); 
        router.navigate(['/login']); 
      }
      return throwError(error);
    })
  );; 
};