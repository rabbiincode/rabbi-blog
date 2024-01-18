import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'blog-html-to-text',
  standalone: true,
  imports: [FormsModule, QuillModule],
  templateUrl: './html-to-text.component.html',
  styleUrl: './html-to-text.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class HtmlToTextComponent{
  @Input() htmlContent!: string
  quillConfig = {
    toolbar: false
  }
}
