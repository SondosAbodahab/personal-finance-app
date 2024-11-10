import { Component } from '@angular/core';
import { IncomeExpenseComponentComponent } from './components/income-expense-component/income-expense-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports : [IncomeExpenseComponentComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Personal Finance App';
}
