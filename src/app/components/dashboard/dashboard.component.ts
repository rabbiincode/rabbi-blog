import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { BlogContent, Quote } from '../../interfaces/content';
import { MetaTagService } from '../../services/meta-tag.service';
import { PostCardComponent } from '../post-card/post-card.component';
import { OperationsService } from '../../services/operations.service';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'blog-dashboard',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, PostCardComponent, ScrollToTopComponent, CommonModule, MatIconModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent{
  constructor(private auth: AuthService, private meta: MetaTagService, private operation: OperationsService, private router: Router){}
  username!: string
  randomQuote!: string
  randomImage!: string
  blogContent!: BlogContent[]
  imageUrl = '/assets/images/blog/blog6.png'
  quote = 'Embrace the power of your words; with each sentence, you paint a world only you can create. Keep writing, for your stories have the potential to inspire and transform lives'

  ngOnInit(){
    if (!this.auth.isLogin) this.router.navigate(['/login'])
    this.meta.updateTag('description', 'User Dashboard') // Update meta tag
    this.username = this.auth.getUsername(this.auth.username)
    this.operation.getAllPosts().subscribe((data: BlogContent[]) => {
      if (data){
        const userPosts = data
        const publishedPost = userPosts?.filter((post) => this.username == post.author)
        this.blogContent = publishedPost
      }
    })
    this.operation.getAllQuote().subscribe((data: Quote[]) => {
      let quotes: Array<string> = []
      data.map(quote => quotes.push(quote.quote))
      // Get random quotes from database
      if (quotes?.length !== 0) this.randomQuote = quotes[Math.floor(Math.random() * quotes?.length) + 1]
    })
    this.operation.getAllImageUrls().subscribe(urls => {
      let imagePath: Array<string> = []
      urls.map(url => imagePath.push(url))
      // Get random image from database
      if (imagePath?.length !== 0) this.randomImage = imagePath[Math.floor(Math.random() * imagePath?.length) + 1]
    })
  }
  writePost = () => this.router.navigate(['/editor'], { queryParams: { write: 'write-post' } })
}
