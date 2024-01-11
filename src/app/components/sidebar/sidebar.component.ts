import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'blog-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent{
  @Output() searchInput = new EventEmitter<boolean>()
  @Output() toggleSidebar = new EventEmitter<boolean>()
  search = () => this.searchInput.emit(false)
  sidebarToggle = () => this.toggleSidebar.emit(false)
}
