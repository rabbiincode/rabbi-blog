import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogContent } from '../../interfaces/content';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MetaTagService } from '../../services/meta-tag.service';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { OperationsService } from '../../services/operations.service';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'blog-all-posts',
  standalone: true,
  imports: [BlogCardComponent, HeaderComponent, FooterComponent, ScrollToTopComponent, CommonModule],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.scss'
})

export class AllPostsComponent{
  constructor(private meta: MetaTagService, private operation: OperationsService){}
  blogContent!: BlogContent[]

  ngOnInit() {
    this.meta.updateTag('description', 'Admin | View Posts') // Update meta tag
    this.operation.getAllPosts().subscribe((data: BlogContent[]) => {
      this.blogContent = data
    })
  }
}
