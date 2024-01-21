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
  login = false
  admin = false
  @Output() searchInput = new EventEmitter<boolean>()
  @Output() toggleSidebar = new EventEmitter<boolean>()

  ngOnInit() {
    this.admin = this.auth.isAdmin
  }

  search = () => this.searchInput.emit(false)
  sidebarToggle = () => this.toggleSidebar.emit(false)
  authenticate = () => {
    this.login ? '' : this.router.navigate(['/login'])
  }
}
