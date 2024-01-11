import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogContent } from '../interfaces/content';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { OperationsService } from '../../services/operations.service';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'blog-dashboard',
  standalone: true,
  imports: [BlogCardComponent, FooterComponent, HeaderComponent, ScrollToTopComponent, CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent{
  blogContent!: BlogContent[]
  userName = 'Awesome Person'
  constructor(private operation: OperationsService, private router: Router){}

  ngOnInit(){
    this.operation.getAll().subscribe((data: BlogContent[]) => {
      if (data){
        const userPosts = data
        // const readPost = userPosts?.filter((post) => post.postId == postId)
        this.blogContent = userPosts
      }
    })
  }

  writePost = () => {
    this.router.navigate(['/editor'], { queryParams: { write: 'write-post' } })
  }
}
