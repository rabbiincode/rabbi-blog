import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Quote } from '../../interfaces/content';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { MetaTagService } from '../../services/meta-tag.service';
import { OperationsService } from '../../services/operations.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ScrollToTopComponent } from '../../components/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'blog-admin',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ScrollToTopComponent, CommonModule, FormsModule, RouterOutlet,RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})

export class AdminComponent{
  constructor(private alert: AlertService, private meta: MetaTagService, private operation: OperationsService){}
  show = false
  edit = false
  quote!: string
  loading = false
  loading1 = false
  imageUrl!: string
  editValue!: Quote
  allQuotes!: Quote[]
  imageUrls!: string[]
  selectedImage!: File

  ngOnInit() {
    this.meta.updateTag('description', 'Administrator') // Update meta tag
    this.operation.getAllQuote().subscribe((data: Quote[]) => {
      this.allQuotes = data
    })
    this.operation.getAllImageUrls().subscribe(urls => {
      this.imageUrls = urls
    })
  }

  onImageSelected = (event: any): void => {
    this.selectedImage = event.target.files[0]
    // Using URL.createObjectURL to simplify image reading
    this.imageUrl  = URL.createObjectURL(event.target.files[0])
  }

  uploadImage = async () => {
    await this.operation.storeImageUrl('site-images', this.selectedImage).then(() => {
      // Operation Successful
      this.imageUrl = ''
      this.successAlert()
      }, () => {
      // Operation Failed
      this.failAlert()
    })
  }

  postQuote = () => {
    this.loading = true
    this.operation.createQuote(this.quote).then(() => {
      // Operation Successful
      this.loading = false
      this.quote = ''
      this.successAlert()
      }, () => {
      // Operation Failed
      this.loading = false
      this.failAlert()
    })
  }

  editNow = (quote: Quote) => {
    this.editValue = quote
    this.edit = true
  }
  postNow = () => this.edit = false

  editQuote = async () => {
    this.loading1 = true
    console.log(this.editValue.quoteId, this.editValue.quote)
    this.operation.updateQuote(this.editValue.quoteId, {quote: this.editValue.quote}).then(() => {
      // Operation Successful
      this.loading1 = false
      this.editValue.quote = ''
      this.successAlert()
    }, () => {
      // Operation Failed
      this.loading1 = false
      this.failAlert()
    })
  }

  deleteQuote = (quoteId: string) => {
    this.operation.deleteQuote(quoteId).then(() => {
      // Operation Successful
      this.successAlert()
    }, () => {
      // Operation Failed
      this.failAlert()
    })
  }

  deleteImage = (imageUrl: string) => {
    this.operation.deleteImage(imageUrl).subscribe(() => {
      // Operation Successful
      this.successAlert()
    }, () => {
      // Operation Failed
      this.failAlert()
    })
  }
  successAlert = () => this.alert.openSuccessDialog('0ms', '0ms')
  failAlert = () => this.alert.openFailDialog('0ms', '0ms')
}
