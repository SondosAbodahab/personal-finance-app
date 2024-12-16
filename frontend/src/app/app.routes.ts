import { Routes } from '@angular/router';
import { TransactionsComponent } from './components/dashboard/transactions/transactions.component';
import { BudgetsComponent } from './pages/budgets/budgets.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'budgets', component: BudgetsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
