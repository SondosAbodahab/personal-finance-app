import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import {MatMenuModule} from '@angular/material/menu';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [MatIconModule,MatButtonModule ,MatMenuModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent {
  
  constructor(private themeService: ThemeService){
  }

  switchTheme(){
    this.themeService.switchTheme()
  }

}
