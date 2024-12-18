import { Injectable } from "@angular/core";
import { Inject} from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  theme: string = "light-theme";
  constructor(@Inject(DOCUMENT) private document: Document) {}

  setTheme(theme: string) {
    this.document.body.classList.add(theme);
  }

  removeOtherThemes(theme: string) {
    const themes = ["light-theme", "dark-theme"];
    themes.forEach((existingTheme) => {
      if (existingTheme !== theme) {
        this.document.body.classList.remove(existingTheme);
      }
    });
  }

  switchTheme() {
    switch (this.theme) {
      case "light-theme":
        this.setTheme("dark-theme");
        this.removeOtherThemes("dark-theme");
        this.theme = "dark-theme";
        break;
      case "dark-theme":
        this.setTheme("light-theme");
        this.removeOtherThemes("light-theme");
        this.theme = "light-theme";
        break;
    }
  }
}
