import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BlogContent } from '../../interfaces/content';
import { Categories } from '../../interfaces/categories';
import { ActivatedRoute, Router } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MetaTagService } from '../../services/meta-tag.service';
import { CommentsComponent } from '../comments/comments.component';
import { PostCardComponent } from '../post-card/post-card.component';
import { OperationsService } from '../../services/operations.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HtmlToTextComponent } from '../html-to-text/html-to-text.component';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'blog-post',
  standalone: true,
  imports: [CommentsComponent, FooterComponent, HeaderComponent, HtmlToTextComponent, PostCardComponent, ScrollToTopComponent, CommonModule, MatIconModule, MatRippleModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})

export class PostComponent{
  constructor(private activatedRoute: ActivatedRoute, private alert: AlertService, private auth: AuthService, private meta: MetaTagService, private operation: OperationsService, private router: Router){}
  likeCount = 0
  liked = false
  comment = false
  postId!: string
  loading = false
  isLogin = false
  category = 'All'
  dislikeCount = 0
  disliked = false
  username!: string
  showOptions = false
  fetchingData = false
  categories = Categories
  previewImageUrl!: string
  @Input() preview = false
  @Input() writePost = true
  previewData!:BlogContent[]
  readContent!: BlogContent[]
  readMoreContent!: BlogContent[]
  @Input() previewContent!: BlogContent[]
  @Output() back = new EventEmitter<boolean>()

  ngOnInit() {
    !this.preview ? this.fetchingData = true : this.fetchingData = false
    this.isLogin = this.auth.isLogin
    this.username = this.auth.getUsername(this.auth.username)
    // Subscribe to route change event and rerender component on route change
    this.activatedRoute.queryParams.subscribe(params => {
      this.postId = params['r']
      this.getAllPost(params['r'])
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

  toggleComment = () => {
    this.comment = !this.comment
    if (typeof window !== 'undefined'){
      const tagName = document.getElementsByTagName('html')[0]
      this.comment ? tagName.style.overflow = 'hidden' : tagName.style.overflow = 'auto'
    }
  }

  getAllPost = (postId: string) => {
    let content: BlogContent
    this.operation.getAllPosts().subscribe((data: BlogContent[]) => {
      if (data){
        const moreContent = data
        const readPost = moreContent?.filter((post) => post.postId == postId)
        this.readContent = readPost
        readPost.map(read => content = read) // Get readPost category
        this.category = content?.category
        // Update meta tag
        this.meta.setTitle(content?.title)
        this.meta.updateTag('description', content?.overview)
        // Filter out the current blog from read more
        const readMore = moreContent?.filter((post) => post.postId !== postId)
        // Show related category post in read more
        const relatedPosts = readMore?.filter((post) => post.category == content?.category)
        // If relatedPosts == 0 show all readPosts else show related category posts
        if (relatedPosts.length == 0){
          this.category = 'All'
          this.readMoreContent = readMore
        } else{
          this.readMoreContent = relatedPosts
        }
      }
      this.fetchingData = false
    })
  }

  getCategoryPosts = (postCategory: string) => {
    this.operation.getAllPosts().subscribe((data: BlogContent[]) => {
      if (postCategory == 'All'){
        // Filter out the current blog from read more
        const readMore = data?.filter((post) => post.postId !== this.postId)
        this.readMoreContent = readMore
      } else{
        const categoryPost = data?.filter((post) => postCategory == post.category)
        const readMore = categoryPost?.filter((post) => post.postId !== this.postId)
        this.readMoreContent = readMore
      }
    })
  }

  show = () => this.showOptions = !this.showOptions
  select = (option: string) => {
    this.category = option
    this.getCategoryPosts(option)
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

  like = () => {
    if (this.disliked){
      this.dislikeCount -= 1
      this.disliked = !this.disliked
    }
    this.liked ? this.likeCount -= 1 : this.likeCount += 1
    this.liked = !this.liked
  }

  disLike = () => {
    if (this.liked){
      this.likeCount -= 1
      this.liked = !this.liked
    }
    this.disliked ? this.dislikeCount -= 1 : this.dislikeCount += 1
    this.disliked = !this.disliked
  }
  successAlert = () => this.alert.openSuccessDialog('0ms', '0ms')
  failAlert = () => this.alert.openFailDialog('0ms', '0ms')
}
