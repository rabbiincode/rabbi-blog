import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogContent } from '../interfaces/content';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { OperationsService } from '../../services/operations.service';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'blog-dashboard',
  standalone: true,
  imports: [BlogCardComponent, FooterComponent, HeaderComponent, ScrollToTopComponent, CommonModule, MatIconModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent{
  constructor(private operation: OperationsService, private router: Router){}
  blogContent!: BlogContent[]
  userName = 'Awesome Person'
  randomImage = `/assets/images/blog/blog${Math.floor(Math.random() * 6) + 1}.png`

  ngOnInit(){
    this.operation.getAll().subscribe((data: BlogContent[]) => {
      if (data){
        const userPosts = data
        // const publishedPost = userPosts?.filter((post) => post.author == author)
        this.blogContent = userPosts
      }
    })
  }

  writePost = () => {
    this.router.navigate(['/editor'], { queryParams: { write: 'write-post' } })
  }
}
