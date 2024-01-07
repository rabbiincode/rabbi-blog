import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'blog-dashboard',
  standalone: true,
  imports: [BlogCardComponent, FooterComponent, HeaderComponent, ScrollToTopComponent, CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent{
  blogContent = []
  userName = 'Awesome Person'
  constructor(private router: Router){}

  writePost = () => {
    this.router.navigate(['/editor'], { queryParams: { value: 'write-post' } })
  }
}
