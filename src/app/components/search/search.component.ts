import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogContent } from '../interfaces/content';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { OperationsService } from '../../services/operations.service';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'blog-search',
  standalone: true,
  imports: [BlogCardComponent, FooterComponent, HeaderComponent, ScrollToTopComponent, CommonModule, MatIconModule, RouterModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

export class SearchComponent{
  result!: boolean
  searchValue!: string
  blogContent!: BlogContent[]

  constructor(private operation: OperationsService, private route: ActivatedRoute, private router: Router){}
  ngOnInit() {
    const snapshot: ActivatedRouteSnapshot = this.route.snapshot
    this.searchValue = snapshot.queryParams['value']

    this.operation.getAll().subscribe((data: BlogContent[]) => {
      const searchContent = data
      const searchResult = searchContent?.filter((search) => search.title.toLowerCase().includes(this.searchValue.toLowerCase()) || search.overview.toLowerCase().includes(this.searchValue.toLowerCase()))
      searchResult ? this.result = true : false
      this.blogContent = searchResult
    }, () => {
      // Operation Failed
      this.router.navigate(['/'])
    })
  }
}
