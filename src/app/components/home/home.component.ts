import { Component, HostListener, Inject, Renderer2 } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'blog-home',
  standalone: true,
  imports: [BlogCardComponent, HeaderComponent, FooterComponent, ScrollToTopComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent{
  isShow!: boolean
  blogContent = []
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2){}

  scrollToBottom = () => {
    this.renderer.setProperty(this.document.body, 'scrollTop', 500)
  }
}
