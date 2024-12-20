// src/app/services/budget.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from '../../models/budget.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private baseUrl = `${environment.backendUrl}/budget`;

  constructor(private http: HttpClient) {}

  getBudget(): Observable<any> {
    return this.http.get<Budget>(this.baseUrl);
  }

  createBudget(data: Budget): Observable<any> {
    return this.http.post<Budget>(this.baseUrl, data);
  }

  updateBudget(id:string ,data: Budget): Observable<any>{
    return this.http.put<Budget>(`${this.baseUrl}/${id}`, data);
  }
  deleteBudget(id:string){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
