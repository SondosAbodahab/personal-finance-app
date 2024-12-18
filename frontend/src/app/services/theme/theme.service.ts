import { Injectable } from '@angular/core';
import { Renderer2, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  setTheme(theme: string) {
    this.document.body.classList.add(theme);
  }

  removeOtherThemes(theme: string) {
    const themes = ['light-theme', 'dark-theme'];
    themes.forEach((existingTheme) => {
      if (existingTheme !== theme) {
        this.document.body.classList.remove(existingTheme);
      }
    });
  }
}
