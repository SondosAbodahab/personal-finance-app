import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { ThemeService } from "src/app/services/theme/theme.service";
import { ThemeSwitcherComponent } from "../theme-switcher/theme-switcher.component";

@Component({
  selector: "app-nav-bar",
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule , ThemeSwitcherComponent],
  templateUrl: "./nav-bar.component.html",
  styleUrl: "./nav-bar.component.scss",
})
export class NavBarComponent {
  constructor(public authService: AuthService, private themeService: ThemeService) {}
  
  switchTheme(theme: string) {
    this.themeService.setTheme(theme);
    this.themeService.removeOtherThemes(theme);
  }
  logout(){
    this.authService.logout()
  }
}
