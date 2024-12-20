import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5500/api/reports';

  getTotalSpending(): Observable<any> {
    return this.http.get(`${this.baseUrl}/total-spending`);
  }

  getMostExpensiveTransactions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/most-expensive`);
  }

  getAverageExpenses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/average-expenses`);
  }
}
