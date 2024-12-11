import { Component } from '@angular/core';
import { IncomeExpenseComponentComponent } from './components/income-expense-component/income-expense-component.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports : [ CommonModule,IncomeExpenseComponentComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Personal Finance App';
}
