import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { catchError, of, tap } from "rxjs";

import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = environment.backendUrl;
  
  private tokenKey = 'token';
  isAuthenticated = signal(false);

 
  constructor(public http: HttpClient, public router:Router) {
   
    this.initializeAuthState();
  }

  private initializeAuthState() {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      if (decodedToken.exp > Date.now() / 1000) {
        this.isAuthenticated.set(true);
      } else {
        this.logout();
      }
    }
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials).pipe(
      tap((response:any) => {  
        localStorage.setItem(this.tokenKey, response.token);
        this.initializeAuthState();
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return of(null);
      })
    );
  }


  register(data: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, data).pipe(
      tap((response:any) => {  
        localStorage.setItem(this.tokenKey, response.token);
        this.initializeAuthState();
      }),
      catchError((error) => {
        console.error('register failed', error);
        return of(null);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
}
