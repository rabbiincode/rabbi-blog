import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperationsService } from './operations.service';
import { DeleteAlert, FailAlert, SuccessAlert } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})

export class AlertService{
  constructor(private dialog: MatDialog, private operation: OperationsService){}
  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string): void{
    this.dialog.open(DeleteAlert, {
      width: 'fit-content',
      height: 'fit-content',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

  openSuccessDialog(enterAnimationDuration: string, exitAnimationDuration: string): void{
    this.dialog.open(SuccessAlert, {
      width: 'fit-content',
      height: 'fit-content',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

  openFailDialog(enterAnimationDuration: string, exitAnimationDuration: string): void{
    this.dialog.open(FailAlert, {
      width: 'fit-content',
      height: 'fit-content',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

  postId!: string
  getPostId = (postId: string) => this.postId = postId

  deletePost = () => {
    this.operation.deletePost(this.postId).then(() => {
      // Operation Successful
      this.openSuccessDialog('0ms', '0ms')
    }, () => {
      // Operation Failed
      this.openFailDialog('0ms', '0ms')
    })
  }
}
