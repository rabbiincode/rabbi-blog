import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogContent } from '../interfaces/content';
import { BlogComponent } from '../blog/blog.component';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { OperationsService } from '../../services/operations.service';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'blog-editor',
  standalone: true,
  imports: [BlogComponent, BlogCardComponent, FooterComponent, HeaderComponent, CommonModule, FormsModule, MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})

export class EditorComponent{
  constructor(private formBuilder: FormBuilder, private operation: OperationsService, private route: ActivatedRoute){}
  postId!: string
  imageUrl!: string
  writePost = true
  date = new Date()
  postContent!: BlogContent[]
  previewNow = false
  contentForm!: FormGroup
  textareaContent = ''
  previewContent!: BlogContent[]
  selectedImage: File | null = null
  imagePreview: string | null = null
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  ngOnInit() {
    this.contentForm = this.formBuilder.group({
      title: [''],
      content: ['']
    })
    const snapshot: ActivatedRouteSnapshot = this.route.snapshot
    this.writePost = snapshot.queryParams['value'] == 'write-post'
    this.postId = snapshot.queryParams['id']

    // Get post content the user want to edit
    this.operation.getAll().subscribe((data: BlogContent[]) => {
      if (data){
        const editContent = data
        const editPost = editContent?.filter((post) => post.postId == this.postId)
        this.postContent = editPost
        let edit = editPost?.map((post) => ({image: post.bannerUrl, title: post.title, content: post.overview}))

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

  handleTextImage = (event: any): void => {
    const file = event.target.files[0]

    if (file){
      const reader = new FileReader()
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result
        // Append the image to the textarea content
        this.textareaContent += `\r![alt](${e.target.result})\r`

        // Merge the text with the image value
        const formContent = this.contentForm.value.content
        const addImage = `${formContent} ${this.textareaContent}`
        this.contentForm.patchValue({content: addImage})
      }
      reader.readAsDataURL(file)
    }
  }

  getCurrentDate = () => {
    return `${this.date.getDate()}th ${this.months[this.date.getMonth()]} ${this.date.getFullYear()}`
  }

  preview = () => {
    if (!this.imageUrl || this.contentForm.invalid) return
    this.previewContent = [{
      category: '', banner: this.selectedImage, bannerUrl: '', title: this.contentForm.value.title, overview: this.contentForm.value.content,
      publishedDate: this.getCurrentDate(), updatedDate: !this.writePost ? this.getCurrentDate() : '', author: 'rabbi', postId: this.postId
    }]
    this.previewNow = true
  }

  back = () => this.previewNow = false
}
