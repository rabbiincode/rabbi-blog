import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'blog-sidebar',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent{
  constructor(private router: Router){}
  login = false
  @Output() searchInput = new EventEmitter<boolean>()
  @Output() toggleSidebar = new EventEmitter<boolean>()

  search = () => this.searchInput.emit(false)
  sidebarToggle = () => this.toggleSidebar.emit(false)
  auth = () => {
    this.login ? '' : this.router.navigate(['/login'])
  }
}
