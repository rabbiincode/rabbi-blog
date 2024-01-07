import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Content } from '../interfaces/content';
import { BlogComponent } from '../blog/blog.component';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { BlogCardComponent } from '../blog-card/blog-card.component';

@Component({
  selector: 'blog-editor',
  standalone: true,
  imports: [BlogComponent, BlogCardComponent, FooterComponent, HeaderComponent, CommonModule, FormsModule, MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})

export class EditorComponent{
  constructor(private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private route: ActivatedRoute){}
  id!: string
  imageUrl!: any
  blogContent = []
  writePost = true
  date = new Date()
  previewNow = false
  contentForm!: FormGroup
  textareaContent = ''
  previewContent!: Content
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
    this.id = snapshot.queryParams['id']

    // Pre-fill textarea when editing posts
    !this.writePost && this.contentForm.patchValue({title: this.id, content: 'content'})
  }

  onImageSelected = (event: any): void => {
    this.selectedImage = event.target.files[0]
    // Using URL.createObjectURL to simplify image reading
    this.imageUrl = URL.createObjectURL(event.target.files[0])
    // this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(url)
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
    return `${this.date.getDate()}th ${this.months[this.date.getMonth()]} ${this.date.getFullYear()}}`
  }

  preview = () => {
    if (!this.selectedImage || this.contentForm.invalid) return
    this.previewContent = {id: 1, category: '', banner: '', title: this.contentForm.value.title, overview: this.contentForm.value.content, publishedDate: this.getCurrentDate(), updatedDate: '', author: 'rabbi'}
    this.previewNow = true
  }

  back = () => this.previewNow = false
}
