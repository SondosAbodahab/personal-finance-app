import { HttpClient } from "@angular/common/http";
import { Injectable, computed, signal } from "@angular/core";
import { Observable, catchError, of, tap } from "rxjs";
import { AuthResponse } from "../../models/auth.model";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = "http://localhost:5500/api/auth";
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
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
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
    return this.http.post(`${this.baseUrl}/register`, data).pipe(
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
