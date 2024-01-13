import { CommonModule } from '@angular/common';
import { BlogContent } from '../interfaces/content';
import { BlogComponent } from '../blog/blog.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { OperationsService } from '../../services/operations.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink } from '@angular/router';

@Component({
  selector: 'blog-editor',
  standalone: true,
  imports: [BlogComponent, BlogCardComponent, FooterComponent, HeaderComponent, AngularEditorModule, CommonModule, HttpClientModule, MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class EditorComponent{
  constructor(private formBuilder: FormBuilder, private operation: OperationsService, private route: ActivatedRoute){}
  postId!: string
  imageUrl!: string
  writePost = true
  date = new Date()
  formData!: object
  previewNow = false
  contentForm!: FormGroup
  publishedDate!: string
  previewContent!: BlogContent[]
  selectedImage: File | null = null
  imagePreview: string | null = null
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  ngOnInit() {
    this.contentForm = this.formBuilder.group({
      title: [''],
      content: ['']
    })

    const snapshot: ActivatedRouteSnapshot = this.route.snapshot
    this.writePost = snapshot.queryParams['write'] == 'write-post'
    this.postId = snapshot.queryParams['post']

    // Get post content the user want to edit
    this.operation.getAll().subscribe((data: BlogContent[]) => {
      if (data){
        const editContent = data
        const editPost = editContent?.filter((post) => post.postId == this.postId)
        let edit = editPost?.map((post) => ({image: post.bannerUrl, title: post.title, content: post.overview, publishedDate: post.publishedDate}))
        this.publishedDate = edit[0]?.publishedDate

        // Pre-fill textarea and image when editing posts
        !this.writePost && this.contentForm.patchValue({title: edit[0]?.title, content: edit[0]?.content})
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
      category: '', banner: this.selectedImage, bannerUrl: (!this.writePost && !this.selectedImage) ? this.imageUrl : '', title: this.contentForm.value.title, overview: this.contentForm.value.content,
      publishedDate: this.writePost ? this.getCurrentDate() : this.publishedDate, updatedDate: !this.writePost ? this.getCurrentDate() : '', author: 'rabbi', postId: this.postId
    }]
    this.previewNow = true
  }

  back = () => this.previewNow = false

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '8rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    outline: false,
    placeholder: 'Start Writing...',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    defaultFontSize: '',
    fonts: [
    {class: 'arial', name: 'Arial'},
    {class: 'times-new-roman', name: 'Times New Roman'},
    {class: 'calibri', name: 'Calibri'},
    {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize']
    ],
    // upload: (file: File) => { return this.operation.storeImageUrl(file) }
  }
}
