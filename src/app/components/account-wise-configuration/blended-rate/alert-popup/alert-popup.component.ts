import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessPopupComponent } from 'src/app/components/my-dashboard/success-popup/success-popup.component';

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  styleUrls: ['./alert-popup.component.scss']
})
export class AlertPopupComponent {
  title: string;
  isCancelled: boolean;
  member: any;
  //@Input() headingText: string;
  @Output() cancelClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();
  buttonCancel: string;
  buttonOk: string;

  constructor(
    public dialogRef: MatDialogRef<AlertPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private dialog : MatDialog
  ) {
    dialogRef.disableClose = true;
    this.title = data.title;
    this.buttonCancel = data.buttonCancel ?? 'Cancel';
    this.buttonOk = data.buttonOk ?? 'Delete';
  }
  public cancelClickEvent() {
    this.cancelClick.emit();
    this.isCancelled = true;
    this.dialogRef.close();
  }

  public deleteClickEvent() {
    this.deleteClick.emit();
    this.isCancelled = false;
    this.dialog.open(SuccessPopupComponent, {
      width: '530px',
      data: { message: 'Data Deleted Successfully !' }
    });
    this.dialogRef.close();
  }
}
