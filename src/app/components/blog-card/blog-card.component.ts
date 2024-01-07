import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'blog-blog-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})

export class BlogCardComponent{
  @Input() blogContent!: any
  constructor(private router: Router){}
  blogs = [
    {
      id: 1,
      category: '',
      image: '/assets/images/blog/blog1.png',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      overview: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt incidunt fugiat quos porro repellat harum. Adipisci tempora corporis rem cum.',
      publishDate: '',
      author: ''
    },
    {
      id: 2,
      category: '',
      image: '/assets/images/blog/blog2.png',
      title: 'Lorem ipsum dolor sit amet consect.',
      overview: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt incidunt fugiat quos porro repellat harum. Adipisci tempora corporis rem cum.',
      publishDate: '',
      author: ''
    },
    {
      id: 3,
      category: '',
      image: '/assets/images/blog/blog3.png',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      overview: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt incidunt fugiat quos porro repellat harum. Adipisci tempora corporis rem cum.',
      publishDate: '',
      author: ''
    },
    {
      id: 4,
      category: '',
      image: '/assets/images/blog/blog4.png',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      overview: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt incidunt fugiat quos porro repellat harum. Adipisci tempora corporis rem cum.',
      publishDate: '',
      author: ''
    },
    {
      id: 5,
      category: '',
      image: '/assets/images/blog/blog5.png',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      overview: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt incidunt fugiat quos porro repellat harum. Adipisci tempora corporis rem cum.',
      publishDate: '',
      author: ''
    },
    {
      id: 6,
      category: '',
      image: '/assets/images/blog/blog3.png',
      title: 'Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet consecteturLorem ipsum dolor sit amet',
      overview: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt incidunt fugiat quos porro repellat harum. Adipisci tempora corporis rem cum.',
      publishDate: '',
      author: ''
    },
    {
      id: 7,
      category: '',
      image: '/assets/images/blog/blog6.png',
      title: 'Lorem ipsum dolor sit amet consectetur.',
      overview: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt incidunt fugiat quos porro repellat harum. Adipisci tempora corporis rem cum.',
      publishDate: '',
      author: ''
    }
  ]

  readPost = () => {
    this.router.navigate(['/blog'])
  }
  editPost = () => {
    this.router.navigate(['/editor'], { queryParams: { value: 'edit-post', id: '1' } })
  }
  deletePost = () => {}
}
