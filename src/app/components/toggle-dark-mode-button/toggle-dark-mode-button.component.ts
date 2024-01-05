import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'blog-toggle-dark-mode-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './toggle-dark-mode-button.component.html',
  styleUrl: './toggle-dark-mode-button.component.scss'
})

export class ToggleDarkModeButtonComponent{
  darkMode = false
  toggleDarkMode = () => {
    document.body.classList.toggle('dark-theme')
    this.darkMode = !this.darkMode
  }
}
