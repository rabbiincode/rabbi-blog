import { Component, ElementRef, HostListener, Inject, Renderer2, ViewChild } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'blog-scroll-to-top',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss'
})

export class ScrollToTopComponent{
  showScrollButton = false
  topPositionToStartShowing = 300
  @ViewChild('appRoot') blogRoot: ElementRef | undefined

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2){}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop
    this.showScrollButton = scrollPosition > this.topPositionToStartShowing
  }

  scrollToTop = () => {
    if (typeof window !== 'undefined'){
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
