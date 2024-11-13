import { Component } from '@angular/core';
import { IncomeExpenseComponentComponent } from './components/income-expense-component/income-expense-component.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports : [IncomeExpenseComponentComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Personal Finance App';
}
