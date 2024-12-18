import { Component } from '@angular/core';
import { IncomeExpenseComponentComponent } from './components/income-expense-component/income-expense-component.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { AuthService } from './services/auth/auth.service';
import { ThemeService } from './services/theme/theme.service';
import { MatCardModule } from "@angular/material/card";
import { ThemeSwitcherComponent } from "./components/theme-switcher/theme-switcher.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavBarComponent, NavBarComponent, MatCardModule, ThemeSwitcherComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Personal Finance App';
  
  constructor(public authService:AuthService,private themeService: ThemeService){
  }

  switchTheme(theme: string) {
    this.themeService.setTheme(theme);
    this.themeService.removeOtherThemes(theme);
  }
}
