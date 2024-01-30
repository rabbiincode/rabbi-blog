import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogContent } from '../../interfaces/content';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MetaTagService } from '../../services/meta-tag.service';
import { PostCardComponent } from '../post-card/post-card.component';
import { OperationsService } from '../../services/operations.service';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'blog-search',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, PostCardComponent, ScrollToTopComponent, CommonModule, MatIconModule, RouterModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

export class SearchComponent{
  admin = false
  result = false
  loading = false
  searchValue!: string
  blogContent!: BlogContent[]

  constructor(private auth: AuthService, private meta: MetaTagService, private operation: OperationsService, private activatedRoute: ActivatedRoute, private router: Router){}
  ngOnInit() {
    this.admin = this.auth.isAdmin
    this.loading = true
    // Subscribe to route change event and rerender component on route change
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchValue = params['q']
      this.getSearchResult(params['q'])
    })
    this.meta.updateTag('description', `Search/${this.searchValue}`) // Update meta tag
  }

  getSearchResult = (value: string) => {
    this.operation.getAllPosts().subscribe((data: BlogContent[]) => {
      const searchContent = data
      const searchResult = searchContent?.filter((search) => search?.title?.toLowerCase().includes(value?.toLowerCase()) || search?.overview?.toLowerCase().includes(value?.toLowerCase()))
      searchResult?.length == 0 ? this.result = false : this.result = true
      this.loading = false
      this.blogContent = searchResult
    }, () => {
      // Operation Failed
      this.loading = false
      this.router.navigate([this.admin ? '/admin' : '/'])
    })
  }
}
