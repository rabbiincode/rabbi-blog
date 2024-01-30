import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostContent } from '../../interfaces/content';
import { MetaTagService } from '../../services/meta-tag.service';
import { OperationsService } from '../../services/operations.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'blog-all-posts',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, PostCardComponent, ScrollToTopComponent, CommonModule],
  templateUrl: './all-posts.component.html',
  styleUrl: './all-posts.component.scss'
})

export class AllPostsComponent{
  constructor(private meta: MetaTagService, private operation: OperationsService){}
  postContent!: PostContent[]

  ngOnInit() {
    this.meta.updateTag('description', 'Admin | View Posts') // Update meta tag
    this.operation.getAllPosts().subscribe((data: PostContent[]) => {
      this.postContent = data
    })
  }
}
