import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'blog-search',
  standalone: true,
  imports: [BlogCardComponent, FooterComponent, HeaderComponent, ScrollToTopComponent, CommonModule, MatIconModule, RouterModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

export class SearchComponent{
  result = true
  searchValue!: any
  blogContent = []

  constructor(private route: ActivatedRoute){}
  ngOnInit() {
    const snapshot: ActivatedRouteSnapshot = this.route.snapshot
    this.searchValue = snapshot.queryParams['value']
  }
}
