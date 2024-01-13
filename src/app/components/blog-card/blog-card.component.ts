import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BlogContent } from '../interfaces/content';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { OperationsService } from '../../services/operations.service';
import { HtmlToTextComponent } from '../html-to-text/html-to-text.component';

@Component({
  selector: 'blog-blog-card',
  standalone: true,
  imports: [HtmlToTextComponent, CommonModule, MatIconModule, RouterModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})

export class BlogCardComponent{
  @Input() blogContent!: BlogContent[]
  constructor(private operation: OperationsService, private router: Router){}
  totalPages = 1
  currentPage = 1
  dataPerPage = 8
  indexOfLastItem!: any
  indexOfFirstItem!: any
  currentBlogContent!: BlogContent[]

  // Page pagination
  ngOnChanges() {
    // This method is called whenever the input properties change
    this.updatePagination()
  }

  getFirstWords = (content: string | undefined): string => {
    if (content){
      // Split the content into words and take the first 20 words
      const words = content.split(/\s+/).slice(0, 20)
      return words.join(' ') + '...'
    } else return ''
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
    this.operation.deletePost(postId).then(() => {
      // Operation Successful
      this.router.navigate(['/'])
    }, () => {
      // Operation Failed
    })
  }
}
