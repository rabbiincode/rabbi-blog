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
  private intervalId!: any
  @ViewChild('appRoot') blogRoot: ElementRef | undefined

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2){}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = this.document.body.clientHeight > 300
  }

  scrollToTop = () => {
    this.renderer.setProperty(this.document.body, 'scrollTop', 0)
  }
}
