import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ToggleDarkModeButtonComponent } from '../toggle-dark-mode-button/toggle-dark-mode-button.component';

@Component({
  selector: 'blog-header',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, RouterModule, RouterLink, SidebarComponent, ToggleDarkModeButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent{
  constructor(private router: Router, private route: ActivatedRoute){
    this.activeRoute = this.route.snapshot.url.map(segment => segment.path).join('/')
  }
  open = false
  search = false
  searchValue!: any
  activeRoute!: string
  searchInput = () => this.search = !this.search
  toggleSidebar = () => this.open = !this.open
  searchBlog = () => {
    if (!this.searchValue) return
    const currentRouteSegment = this.route.snapshot.url[0]?.path
    if (currentRouteSegment && currentRouteSegment.startsWith('search')){
      this.router.navigate(['/'])
    }
    this.router.navigate(['search'], { queryParams: { value: this.searchValue } })
  }
}
