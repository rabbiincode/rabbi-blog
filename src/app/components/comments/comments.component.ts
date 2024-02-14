import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Comments } from '../../interfaces/content';
import { MatIconModule } from '@angular/material/icon';
import { AlertService } from '../../services/alert.service';
import { OperationsService } from '../../services/operations.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'blog-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})

export class CommentsComponent{
  constructor(private alert: AlertService, private operation: OperationsService){}
  regex = /[^\s]/
  liked = false
  disliked = false
  comment!: string
  comments!: Comments[]
  likedComment: string[] = []
  dislikedComment: string[] = []
  @Input() postId!: string
  @Input() isLogin = false
  @Input() username!: string
  @Output() toggleComment  = new EventEmitter<boolean>()

  ngOnInit() {
    this.operation.getAllComments().subscribe(data => {
      this.comments = data.filter(comment => this.postId = comment.postId)
    }, () => {
      this.comments = []
    })
  }

  containsLetters = (input: string) => {
    return this.regex.test(input)
  }

  commentToggle = () => this.toggleComment.emit(false)
  cancelComment = () => this.comment = ''
  postComment = () => {
    if (!this.containsLetters(this.comment)){
      this.comment = ''
      return this.alert.openWarnDialog('Comment invalid')
    }
    this.operation.createComment({
      comment: this.comment, commentId: '', author: this.isLogin ? this.username : 'anonymous', postId: this.postId, likedCommentCount: 0, dislikedCommentCount: 0, liked: [], disliked: []
    }).then(() => {
      this.comment = ''
    }, () => {
      this.alert.openFailDialog()
    })
  }

  likeComment = (commentId: string) => {
    const comment = this.comments.find(c => c.commentId === commentId)
    const index = this.likedComment.indexOf(commentId)
    let index1 = 0
    if(comment) index1 = comment.disliked.indexOf(this.username)
  
    if (!this.isLogin && this.dislikedComment.includes(commentId) && comment){
      comment.dislikedCommentCount--
      this.dislikedComment.splice(index, 1)
      this.operation.updateComment(commentId, comment)
    }
    if (this.isLogin && comment && comment.disliked.includes(this.username)){
      comment.dislikedCommentCount--
      comment.disliked?.splice(index1, 1)
      this.operation.updateComment(commentId, comment)
    }

    if(!this.isLogin && comment) this.likedComment.includes(commentId) ? comment.likedCommentCount-- : comment.likedCommentCount++
    if (this.isLogin && comment){
      comment.liked?.includes(this.username) ? comment.likedCommentCount-- : comment.likedCommentCount++
      comment.liked?.includes(this.username) ? comment.liked?.splice(index1, 1) : comment.liked.push(this.username)
    } 
    this.likedComment.includes(commentId) ? this.likedComment.splice(index, 1) : this.likedComment.push(commentId)
    this.operation.updateComment(commentId, comment)
  }

  disLikeComment = (commentId: string) => {
    const comment = this.comments.find(c => c.commentId === commentId)
    const index = this.dislikedComment.indexOf(commentId)
    let index1 = 0
    if(comment) index1 = comment.disliked.indexOf(this.username)

    if (!this.isLogin && this.likedComment.includes(commentId) && comment){
      comment.likedCommentCount--
      this.likedComment.splice(index, 1)
      this.operation.updateComment(commentId, comment)
    }
    if (this.isLogin && comment && comment.liked.includes(this.username)){
      comment.likedCommentCount--
      comment.liked?.splice(index1, 1)
      this.operation.updateComment(commentId, comment)
    }

    if(!this.isLogin && comment) this.dislikedComment.includes(commentId) ? comment.dislikedCommentCount-- : comment.dislikedCommentCount++
    if (this.isLogin && comment){
      comment.disliked?.includes(this.username) ? comment.dislikedCommentCount-- : comment.dislikedCommentCount++
      comment.disliked?.includes(this.username) ? comment.disliked?.splice(index1, 1) : comment.disliked.push(this.username)
    }
    this.dislikedComment.includes(commentId) ? this.dislikedComment.splice(index, 1) : this.dislikedComment.push(commentId)
    this.operation.updateComment(commentId, comment)
  }
  deleteComment = (commentId: string) => this.operation.deleteComment(commentId)
}
