import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class MetaTagService {
  constructor(private meta: Meta, private title: Title){}
  updateTag = (tag: string, value: string): void => {
    this.meta.updateTag({ name: tag, content: value })
  }
  setTitle = (pageTitle: string): void => {
    this.title.setTitle(pageTitle)
  }
}
