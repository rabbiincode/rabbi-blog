import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Comments } from '../../interfaces/content';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'blog-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatRippleModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})

export class CommentsComponent{
  comment!: string
  commentId!: string
  likedComment: string[] = []
  dislikedComment: string[] = []
  comments: Comments[] = [
    {id: '1', comment: 'comment', likedCommentCount: 0, dislikedCommentCount: 0},
    {id: '2', comment: 'comment', likedCommentCount: 0, dislikedCommentCount: 0},
    {id: '3', comment: 'comment', likedCommentCount: 0, dislikedCommentCount: 0}
  ]
  @Output() toggleComment  = new EventEmitter<boolean>()

  commentToggle = () => this.toggleComment.emit(false)
  cancelComment = () => this.comment = ''
  postComment = () => {}

  likeComment = (commentId: string) => {
    const index = this.likedComment.indexOf(commentId)
    const comment = this.comments.find(c => c.id === commentId)
    this.commentId = commentId
    if (this.dislikedComment.includes(commentId)){
      if(comment) comment.dislikedCommentCount--
      this.dislikedComment.splice(index, 1)
    }
    if(comment) this.likedComment.includes(commentId) ? comment.likedCommentCount-- : comment.likedCommentCount++
    this.likedComment.includes(commentId) ? this.likedComment.splice(index, 1) : this.likedComment.push(commentId)
  }

  disLikeComment = (commentId: string) => {
    const comment = this.comments.find(c => c.id === commentId)
    const index = this.dislikedComment.indexOf(commentId)
    this.commentId = commentId
    if (this.likedComment.includes(commentId)){
      if(comment) comment.likedCommentCount--
      this.likedComment.splice(index, 1)
    }
    if(comment) this.dislikedComment.includes(commentId) ? comment.dislikedCommentCount-- : comment.dislikedCommentCount++
    this.dislikedComment.includes(commentId) ? this.dislikedComment.splice(index, 1) : this.dislikedComment.push(commentId)
  }
}
