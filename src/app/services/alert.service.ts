import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperationsService } from './operations.service';
import { DeleteAlert, FailAlert, SuccessAlert, WarnAlert } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})

export class AlertService{
  constructor(private dialog: MatDialog, private operation: OperationsService){}
  openDeleteDialog = () => {
    this.dialog.open(DeleteAlert, {
      width: 'fit-content',
      height: 'fit-content'
    })
  }

  openSuccessDialog = (message: string, title?: string) => {
    this.dialog.open(SuccessAlert, {
      width: 'fit-content',
      height: 'fit-content',
      data: { title, message }
    })
  }

  openWarnDialog = (message: string, title?: string) => {
    this.dialog.open(WarnAlert, {
      width: 'fit-content',
      height: 'fit-content',
      data: { title, message }
    })
  }

  openFailDialog = () => {
    this.dialog.open(FailAlert, {
      width: 'fit-content',
      height: 'fit-content'
    })
  }

  postId!: string
  getPostId = (postId: string) => this.postId = postId

  deletePost = () => {
    this.operation.deletePost(this.postId).then(() => {
      // Operation Successful
      this.openSuccessDialog('Delete successful')
    }, () => {
      // Operation Failed
      this.openFailDialog()
    })
  }
}
