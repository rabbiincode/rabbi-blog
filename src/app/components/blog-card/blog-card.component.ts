import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BlogContent } from '../interfaces/content';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'blog-blog-card',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, RouterModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})

export class BlogCardComponent{
  constructor(private alert: AlertService, private auth: AuthService,  private router: Router){}
  admin = false
  totalPages = 1
  currentPage = 1
  dataPerPage = 8
  isLogin = false
  username!: string
  indexOfLastItem!: any
  indexOfFirstItem!: any
  currentBlogContent!: BlogContent[]
  @Input() blogContent!: BlogContent[]

  // Page pagination
  ngOnChanges() {
    // This method is called whenever the input properties change
    this.updatePagination()
  }

  ngOnInit() {
    this.admin = this.auth.isAdmin
    this.isLogin = this.auth.isLogin
    this.username = this.auth.getUsername(this.auth.username)
    this.updatePagination()
  }

  updatePagination = () => {
    if (!Array.isArray(this.blogContent)) return
    this.indexOfLastItem = this.currentPage * this.dataPerPage
    this.indexOfFirstItem = this.indexOfLastItem - this.dataPerPage
    this.totalPages = Math.ceil(this.blogContent.length / this.dataPerPage)
    this.currentBlogContent = this.blogContent?.slice(this.indexOfFirstItem, this.indexOfLastItem)
  }

  renderPagination = () => {
    const pageNumbers = []
    for (let i = 1; i <= this.totalPages; i++) pageNumbers.push(i)
    return pageNumbers
  }

  handlePageNavigation = (page: any) => {
    this.currentPage = page
    this.updatePagination()
  }
  navigateBack = () => {
    this.currentPage = this.currentPage - 1
    this.updatePagination()
  }
  navigateForward = () => {
    this.currentPage = this.currentPage + 1
    this.updatePagination()
  }

  // CRUD functions
  readPost = (postId: string) => {
    this.router.navigate(['/blog'], { queryParams: { read: postId } })
  }
  editPost = (postId: string) => {
    this.router.navigate(['/editor'], { queryParams: { write: 'edit-post', post: postId } })
  }
  deletePost = (postId: string) => {
    this.alert.getPostId(postId)
    this.alert.openDeleteDialog('0ms', '0ms')
  }
}
