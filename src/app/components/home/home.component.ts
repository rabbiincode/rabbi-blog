import { BlogContent } from '../interfaces/content';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { OperationsService } from '../../services/operations.service';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'blog-home',
  standalone: true,
  imports: [BlogCardComponent, HeaderComponent, FooterComponent, ScrollToTopComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent{
  isShow!: boolean
  blogContent!: BlogContent[]
  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private operation: OperationsService){}

  ngOnInit() {
    this.operation.getAll().subscribe((data: BlogContent[]) => {
      this.blogContent = data
    })
  }

  scrollToBottom = () => {
    window.scroll({
      top: 500,
      left: 0,
      behavior: 'smooth'
    })
    // this.renderer.setProperty(this.document.body, 'scrollTop', 500)
  }
}
