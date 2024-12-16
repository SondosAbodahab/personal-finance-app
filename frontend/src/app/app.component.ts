import { Component } from '@angular/core';
import { IncomeExpenseComponentComponent } from './components/income-expense-component/income-expense-component.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IncomeExpenseComponentComponent, RouterModule, NavBarComponent ,NavBarComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Personal Finance App';
}
