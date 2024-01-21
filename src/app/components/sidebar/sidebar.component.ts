import { AuthService } from '../../services/auth.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'blog-sidebar',
  standalone: true,
  imports: [ RouterLink, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent{
  constructor(private auth: AuthService, private router: Router){}
  admin = false
  isLogin = false
  @Output() searchInput = new EventEmitter<boolean>()
  @Output() toggleSidebar = new EventEmitter<boolean>()

  ngOnInit() {
    this.admin = this.auth.isAdmin
    this.isLogin = this.auth.isLogin
  }

  search = () => this.searchInput.emit(false)
  sidebarToggle = () => this.toggleSidebar.emit(false)
  authenticate = () => this.isLogin ? this.isLogin = this.auth.logOut() : this.router.navigate(['/login'])
}
