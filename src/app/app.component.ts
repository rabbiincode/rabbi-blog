import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ToggleDarkModeService } from './services/toggle-dark-mode.service';

@Component({
  selector: 'blog-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent{
  // On route change, page scroll to top
  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private renderer: Renderer2, private colorMode: ToggleDarkModeService){}
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) this.scrollToTop()
    })
    this.colorMode.setColorMode()
  }

  private scrollToTop = () => {
    if (typeof window !== 'undefined'){
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
