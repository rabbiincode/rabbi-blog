import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { BlogContent } from '../interfaces/content';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { OperationsService } from '../../services/operations.service';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'blog-blog',
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, BlogCardComponent, FooterComponent, HeaderComponent, MatIconModule, ScrollToTopComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})

export class BlogComponent{
  constructor(private operation: OperationsService, private route: ActivatedRoute, private router: Router){}
  previewImageUrl!: string
  previewData!:BlogContent[]
  @Input() preview = false
  @Input() writePost = true
  readContent!: BlogContent[]
  readMoreContent!: BlogContent[]
  @Input() previewContent!: BlogContent[]
  @Output() back = new EventEmitter<boolean>()

  ngOnInit() {
    const snapshot: ActivatedRouteSnapshot = this.route.snapshot
    let postId = snapshot.queryParams['value']

    this.operation.getAll().subscribe((data: BlogContent[]) => {
      if (data){
        const moreContent = data
        const readPost = moreContent?.filter((post) => post.postId == postId)
        this.readContent = readPost

        // Filter out the current blog from read more
        const readMore = moreContent?.filter((post) => post.postId !== postId)
        this.readMoreContent = readMore
      }
    })
    this.previewData = this.previewContent?.map((post) => ({
      title: post.title, author: post.author, banner: post.banner, bannerUrl: post.bannerUrl, category: post.category,
      overview: post.overview, postId: post.postId, publishedDate: post.publishedDate, updatedDate: post.updatedDate
    }))

    if(this.preview && this.previewData[0].banner){
      this.previewImageUrl = URL.createObjectURL(this.previewData[0].banner)
    }
  }

  goBack = () => this.back.emit(false)

  editPost = async () => {
    console.log(this.previewData[0].postId)
    if (this.previewData[0].banner){
      this.previewData[0].bannerUrl = await this.operation.storeImageUrl(this.previewData[0].banner)
    }

    this.operation.updatePost(this.previewData[0].postId, this.previewData[0]).then(() => {
      // Operation Successful
      this.router.navigate(['/user'])
    }, () => {
      // Operation Failed
      this.back.emit(false)
    })
  }

  publishPost = async () => {
    if (this.previewData[0].banner){
      this.previewData[0].bannerUrl = await this.operation.storeImageUrl(this.previewData[0].banner)
    }
    this.operation.createPost(this.previewData[0]).then(() => {
      // Operation Successful
      this.router.navigate(['/user'])
    }, () => {
      // Operation Failed
      this.back.emit(false)
    })
  }
}
