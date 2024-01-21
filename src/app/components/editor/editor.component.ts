import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import { BlogContent } from '../interfaces/content';
import { BlogComponent } from '../blog/blog.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { OperationsService } from '../../services/operations.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'blog-editor',
  standalone: true,
  imports: [BlogComponent, BlogCardComponent, FooterComponent, HeaderComponent, CommonModule, MatIconModule, QuillModule, ReactiveFormsModule, RouterLink],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class EditorComponent{
  constructor(private auth: AuthService, private formBuilder: FormBuilder, private operation: OperationsService, private route: ActivatedRoute, private router: Router){}
  postId!: string
  writePost = true
  imageUrl!: string
  date = new Date()
  username!: string
  formData!: object
  previewNow = false
  contentForm!: FormGroup
  publishedDate!: string
  previewContent!: BlogContent[]
  selectedImage: File | null = null
  imagePreview: string | null = null
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  ngOnInit() {
    if (!this.auth.isLogin) this.router.navigate(['/login'])
    this.username = this.auth.getUsername(this.auth.username)
    this.contentForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      overview: ['', [Validators.required]]
    })

    const snapshot: ActivatedRouteSnapshot = this.route.snapshot
    this.writePost = snapshot.queryParams['write'] == 'write-post'
    this.postId = snapshot.queryParams['post']

    // Get post content the user want to edit
    this.operation.getAllPosts().subscribe((data: BlogContent[]) => {
      if (data){
        const editContent = data
        const editPost = editContent?.filter((post) => post.postId == this.postId)
        let edit = editPost?.map((post) => ({image: post.bannerUrl, title: post.title, overview: post.overview, content: post.content, publishedDate: post.publishedDate}))
        this.publishedDate = edit[0]?.publishedDate

        // Prefill textarea's and image when editing posts
        !this.writePost && this.contentForm.patchValue({title: edit[0]?.title, overview: edit[0]?.overview, content: edit[0]?.content})
        this.imageUrl = edit[0]?.image
      }
    })
  }

  onImageSelected = (event: any): void => {
    this.selectedImage = event.target.files[0]
    // Using URL.createObjectURL to simplify image reading
    this.imageUrl  = URL.createObjectURL(event.target.files[0])
  }

  getCurrentDate = () => {
    return `${this.date.getDate()}th ${this.months[this.date.getMonth()]} ${this.date.getFullYear()}`
  }

  preview = () => {
    if (!this.imageUrl || this.contentForm.invalid) return
    // bannerUrl logic takes care of when post is edited but image is not changed, otherwise it returns empty to be stored in the image storage database first
    this.previewContent = [{
      category: '', banner: this.selectedImage, bannerUrl: (!this.writePost && !this.selectedImage) ? this.imageUrl : '', title: this.contentForm.value.title, overview: this.contentForm.value.overview,
      content: this.contentForm.value.content, publishedDate: this.writePost ? this.getCurrentDate() : this.publishedDate, updatedDate: !this.writePost ? this.getCurrentDate() : '', author: this.username, postId: this.postId
    }]
    this.previewNow = true
  }
  back = () => this.previewNow = false

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }], // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }], // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }], // outdent/indent
      [{ 'direction': 'rtl' }], // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'], // remove formatting button
      ['link', 'image', 'video'], // link and image, video
      ['spanblock']
    ]
  }
}
