import { BlogContent } from '../interfaces/content';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Component, Inject, Renderer2 } from '@angular/core';
import { MetaTagService } from '../../services/meta-tag.service';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { OperationsService } from '../../services/operations.service';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'blog-home',
  standalone: true,
  imports: [BlogCardComponent, HeaderComponent, FooterComponent, ScrollToTopComponent, CommonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent{
  category = 'All'
  isShow!: boolean
  showOptions = false
  blogContent!: BlogContent[]
  categories = ['All', 'Nature', 'Tech', 'History']
  constructor(@Inject(DOCUMENT) private document: Document, private meta: MetaTagService, private renderer: Renderer2, private operation: OperationsService){}

  ngOnInit() {
    this.getPosts()
    this.meta.updateTag('description', 'Rabbi Blog') // Update meta tag
  }

  show = () => this.showOptions = !this.showOptions
  select = (option: string) => {
    this.category = option
    this.getPosts()
  }

  getPosts = () => {
    this.operation.getAllPosts().subscribe((data: BlogContent[]) => {
      if (this.category == 'All'){
        this.blogContent = data
      } else{
        const categoryPost = data?.filter((post) => this.category == post.category)
        this.blogContent = categoryPost
      }
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
