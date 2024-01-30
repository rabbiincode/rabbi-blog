import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToggleDarkModeButtonComponent } from '../toggle-dark-mode-button/toggle-dark-mode-button.component';

@Component({
  selector: 'blog-header',
  standalone: true,
  imports: [SidebarComponent, ToggleDarkModeButtonComponent, CommonModule, FormsModule, MatIconModule, MatTooltipModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent{
  open = false
  admin = false
  search = false
  isLogin = false
  searchValue!: string
  constructor(private auth: AuthService, private router: Router){}

  ngOnInit() {
    this.admin = this.auth.isAdmin
    this.isLogin = this.auth.isLogin
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (typeof window !== 'undefined'){
      // Remove and add scrollbar on sidebar toggle and window resize
      let windowWidth = (event.target as Window).innerWidth
      const tagName = document.getElementsByTagName('html')[0]
      windowWidth > 768 ? tagName.style.overflow = 'auto' : ''
      windowWidth < 768 && this.open ? tagName.style.overflow = 'hidden' : tagName.style.overflow = 'auto'
    }
  }

  searchInput = () => this.search = !this.search
  authenticate = () => this.isLogin ? this.isLogin = this.auth.logOut() : this.router.navigate(['/login'])

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
    this.open = false
    this.router.navigate(['search'], { queryParams: { q: this.searchValue } })
  }
}
