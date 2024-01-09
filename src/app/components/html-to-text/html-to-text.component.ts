import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';

@Component({
  selector: 'blog-html-to-text',
  standalone: true,
  imports: [AngularEditorModule, FormsModule, HttpClientModule],
  templateUrl: './html-to-text.component.html',
  styleUrl: './html-to-text.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class HtmlToTextComponent{
  @Input() htmlContent!: string
  editorConfig: AngularEditorConfig = {
    editable: false,
    spellcheck: false,
    height: 'auto',
    minHeight: '5rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'no',
    enableToolbar: false,
    showToolbar: false,
    outline: false,
    placeholder: '',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    defaultFontSize: '',
    fonts: [
    {class: 'arial', name: 'Arial'},
    {class: 'times-new-roman', name: 'Times New Roman'},
    {class: 'calibri', name: 'Calibri'},
    {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ]
  }
}
