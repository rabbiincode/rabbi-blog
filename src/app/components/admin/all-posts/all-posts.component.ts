import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogContent } from '../../interfaces/content';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';
import { BlogCardComponent } from '../../blog-card/blog-card.component';
import { OperationsService } from '../../../services/operations.service';
import { ScrollToTopComponent } from '../../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'blog-all-posts',
  standalone: true,
  imports: [BlogCardComponent, HeaderComponent, FooterComponent, ScrollToTopComponent, CommonModule],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.scss'
})

export class AllPostsComponent{
  constructor(private operation: OperationsService){}
  blogContent!: BlogContent[]

  ngOnInit() {
    this.operation.getAllPosts().subscribe((data: BlogContent[]) => {
      this.blogContent = data
    })
  }
}
