import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PostContent } from '../../interfaces/content';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'blog-post-card',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, RouterModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})

export class PostCardComponent{
  constructor(private alert: AlertService, private auth: AuthService,  private router: Router){}
  admin = false
  totalPages = 1
  currentPage = 1
  dataPerPage = 8
  isLogin = false
  loading = false
  username!: string
  indexOfLastItem!: any
  indexOfFirstItem!: any
  currentPostContent!: PostContent[]
  @Input() postContent!: PostContent[]

  // Page pagination
  ngOnChanges() {
    // This method is called whenever the input properties change
    this.updatePagination()
  }

  ngOnInit() {
    this.loading = true
    this.admin = this.auth.isAdmin
    this.isLogin = this.auth.isLogin
    this.username = this.auth.getUsername(this.auth.username)
    this.updatePagination()
  }

  updatePagination = () => {
    if (!Array.isArray(this.postContent)) return
    this.indexOfLastItem = this.currentPage * this.dataPerPage
    this.indexOfFirstItem = this.indexOfLastItem - this.dataPerPage
    this.totalPages = Math.ceil(this.postContent.length / this.dataPerPage)
    this.currentPostContent = this.postContent?.slice(this.indexOfFirstItem, this.indexOfLastItem)
    this.loading = false
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
  readPost = (postId: string) => this.router.navigate(['/post'], { queryParams: { r: postId } })
  editPost = (postId: string) => this.router.navigate(['/editor'], { queryParams: { write: 'edit-post', post: postId } })
  deletePost = (postId: string) => {
    this.alert.getPostId(postId)
    this.alert.openDeleteDialog()
  }
}
