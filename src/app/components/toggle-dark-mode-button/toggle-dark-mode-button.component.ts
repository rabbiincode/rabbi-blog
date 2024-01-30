import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ToggleDarkModeService } from '../../services/toggle-dark-mode.service';

@Component({
  selector: 'blog-toggle-dark-mode-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './toggle-dark-mode-button.component.html',
  styleUrl: './toggle-dark-mode-button.component.scss'
})

export class ToggleDarkModeButtonComponent{
  constructor(private colorMode: ToggleDarkModeService){}
  darkMode = true

  ngOnInit() {
    this.colorMode.darkMode$.subscribe((newMode) => {
      this.darkMode = newMode == 'true'
    })
  }
  toggleDarkMode = () => this.colorMode.toggleDarkMode()
}
