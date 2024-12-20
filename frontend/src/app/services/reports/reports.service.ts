import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.backendUrl}/reports`;

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
