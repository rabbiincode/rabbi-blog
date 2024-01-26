import { CommonModule } from '@angular/common';
import { BlogContent } from '../interfaces/content';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MetaTagService } from '../../services/meta-tag.service';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { OperationsService } from '../../services/operations.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HtmlToTextComponent } from '../html-to-text/html-to-text.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'blog-blog',
  standalone: true,
  imports: [BlogCardComponent, FooterComponent, HeaderComponent, HtmlToTextComponent, ScrollToTopComponent, CommonModule, MatIconModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})

export class BlogComponent{
  constructor(private activatedRoute: ActivatedRoute, private alert: AlertService, private meta: MetaTagService, private operation: OperationsService, private router: Router){}
  loading = false
  previewImageUrl!: string
  @Input() preview = false
  @Input() writePost = true
  previewData!:BlogContent[]
  readContent!: BlogContent[]
  readMoreContent!: BlogContent[]
  @Input() previewContent!: BlogContent[]
  @Output() back = new EventEmitter<boolean>()
  @Output() reRender = new EventEmitter<boolean>()

  ngOnInit() {
    // Subscribe to route change event and rerender component on route change
    this.activatedRoute.queryParams.subscribe(params => {
      this.getAllPost(params['read'])
    })

    this.previewData = this.previewContent?.map((post) => ({
      title: post.title, author: post.author, banner: post.banner, bannerUrl: post.bannerUrl, category: post.category,
      content: post.content, overview: post.overview, postId: post.postId, publishedDate: post.publishedDate, updatedDate: post.updatedDate
    }))

    if (this.preview && this.previewData[0].banner){
      this.previewImageUrl = URL.createObjectURL(this.previewData[0].banner)
    }
    if (this.preview && this.previewData[0].bannerUrl){
      this.previewImageUrl = this.preview && this.previewData[0].bannerUrl
    }
  }

  getAllPost = (postId: string) => {
    let readContent: BlogContent
    this.operation.getAllPosts().subscribe((data: BlogContent[]) => {
      if (data){
        const moreContent = data
        const readPost = moreContent?.filter((post) => post.postId == postId)
        this.readContent = readPost
        readPost.map(read => readContent = read) // Get readPost category
        // Update meta tag
        this.meta.setTitle(readContent.title)
        this.meta.updateTag('description', readContent.overview)
        // Filter out the current blog from read more
        const readMore = moreContent?.filter((post) => post.postId !== postId)
        // Show related category post in read more
        const relatedPosts = readMore?.filter((post) => post.category == readContent.category)
        // If relatedPosts <= 2 show all readPosts else show related category posts
        this.readMoreContent = relatedPosts.length <= 2 ? readMore : relatedPosts
      }
    })
  }
  goBack = () => this.back.emit(false)

  editPost = async () => {
    this.loading = true
    if (this.previewData[0].banner && !this.previewData[0].bannerUrl){
      this.previewData[0].bannerUrl = await this.operation.storeImageUrl('post-images', this.previewData[0].banner)
    }
    this.operation.updatePost(this.previewData[0].postId, this.previewData[0]).then(() => {
      // Operation Successful
      this.loading = false
      this.successAlert()
      this.router.navigate(['/user'])
    }, () => {
      // Operation Failed
      this.loading = false
      this.back.emit(false)
      this.failAlert()
    })
  }

  publishPost = async () => {
    this.loading = true
    if (this.previewData[0].banner){
      // Stores image om firebase storage and returns image url
      this.previewData[0].bannerUrl = await this.operation.storeImageUrl('post-images', this.previewData[0].banner)
    }
    this.operation.createPost(this.previewData[0]).then(() => {
      // Operation Successful
      this.loading = false
      this.successAlert()
      this.router.navigate(['/user'])
    }, () => {
      // Operation Failed
      this.loading = false
      this.back.emit(false)
      this.failAlert()
    })
  }
  successAlert = () => this.alert.openSuccessDialog('0ms', '0ms')
  failAlert = () => this.alert.openFailDialog('0ms', '0ms')
}
