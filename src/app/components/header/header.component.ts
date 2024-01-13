import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, HostListener } from '@angular/core';
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
  open = false
  login = false
  search = false
  searchValue!: string
  activeRoute!: string
  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit() {
    this.activeRoute = this.route.snapshot.url.map(segment => segment.path).join('/')
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (typeof window !== 'undefined'){
      // Remove and add scrollbar on sidebar toggle and window resize
      let windowWidth = (event.target as Window).innerWidth
      const tagName = document.getElementsByTagName('html')[0]
      windowWidth > 768 ? tagName.style.overflow = 'auto' : ''
      windowWidth < 768 && this.open ? tagName.style.overflow = 'hidden' : 'auto'
    }
  }

  searchInput = () => this.search = !this.search
  auth = () => this.login ? '' : this.router.navigate(['/login'])

  toggleSidebar = () => {
    this.open = !this.open
    if (typeof window !== 'undefined'){
      // Remove and add scrollbar on sidebar toggle
      const tagName = document.getElementsByTagName('html')[0]
      tagName && this.open ? tagName.style.overflow = 'hidden' : tagName.style.overflow = 'auto'
    }
  }

  searchBlog = () => {
    if (!this.searchValue) return
    const currentRouteSegment = this.route.snapshot.url[0]?.path
    if (currentRouteSegment && currentRouteSegment.startsWith('search')){
      this.router.navigate(['/'])
    }
    this.router.navigate(['search'], { queryParams: { query: this.searchValue } })
  }
}
