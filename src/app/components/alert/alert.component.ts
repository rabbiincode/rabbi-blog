import { Component, Inject } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { MatDialogRef, MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'blog-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent{}

@Component({
  selector: 'blog-delete-alert',
  standalone: true,
  template: `
    <div class="delete-card">
      <p>Are you sure you want to delete this post?</p>
      <p>Action cannot be undone.</p>
      <div class="delete-buttons">
        <button mat-dialog-close>Back</button>
        <button (click)="delete()">Delete</button>
      </div>
    </div>
  `,
  styleUrl: './alert.component.scss',
  imports: [MatDialogClose]
})
export class DeleteAlert{
  constructor(private alert: AlertService, public dialogRef: MatDialogRef<DeleteAlert>){}
  delete = () => {
    this.alert.deletePost()
    this.dialogRef.close()
  }
}

@Component({
  selector: 'blog-success-alert',
  standalone: true,
  template: `
    <div class="success-card">
      <p>{{data.title}}</p>
      <p>{{data.message}}</p>
      <button mat-dialog-close>Close</button>
    </div>
  `,
  styleUrl: './alert.component.scss',
  imports: [MatDialogClose]
})
export class SuccessAlert{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SuccessAlert>){}
}

@Component({
  selector: 'blog-warn-alert',
  standalone: true,
  template: `
    <div class="success-card warn-card">
      <p>{{data.title}}</p>
      <p>{{data.message}}</p>
      <button mat-dialog-close>Close</button>
    </div>
  `,
  styleUrl: './alert.component.scss',
  imports: [MatDialogClose]
})
export class WarnAlert{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FailAlert>){}
}

@Component({
  selector: 'blog-fail-alert',
  standalone: true,
  template: `
    <div class="success-card fail-card">
      <p>Operation could not complete.</p>
      <p>Try again...</p>
      <button mat-dialog-close>Close</button>
    </div>
  `,
  styleUrl: './alert.component.scss',
  imports: [MatDialogClose]
})
export class FailAlert{
  constructor(public dialogRef: MatDialogRef<FailAlert>){}
}