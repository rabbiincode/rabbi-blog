import { CommonModule } from '@angular/common';
import { Content } from '../interfaces/content';
import { MatIconModule } from '@angular/material/icon';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'blog-blog',
  standalone: true,
  imports: [CommonModule, BlogCardComponent, FooterComponent, HeaderComponent, MatIconModule, ScrollToTopComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})

export class BlogComponent{
  // Filter out the current blog from read more -- implement
  default = {
    id: 0,
    category: '',
    banner: '',
    title: '',
    overview: '',
    publishedDate: '',
    updatedDate: '',
    author: ''
  }
  @Input() preview = false
  @Input() writePost = true
  @Input() previewContent: Content = this.default
  @Output() back = new EventEmitter<boolean>()
  blogContent: Content = this.default
  get content(): Content {
    return this.preview ? this.previewContent : this.blogContent;
  }

  goBack = () => this.back.emit(false)
  editPost = () => {}
  publishPost = () => {}
}
