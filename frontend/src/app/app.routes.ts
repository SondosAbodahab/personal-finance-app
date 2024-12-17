import { Routes } from '@angular/router';
import { TransactionsComponent } from './components/dashboard/transactions/transactions.component';
import { BudgetsComponent } from './pages/budgets/budgets.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'transactions',canActivate: [AuthGuard], component: TransactionsComponent },
  { path: 'budgets',canActivate: [AuthGuard], component: BudgetsComponent },
  { path: 'reports',canActivate: [AuthGuard], component: ReportsComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
