import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ramp-up-validation-popup',
  templateUrl: './ramp-up-validation-popup.component.html',
  styleUrls: ['./ramp-up-validation-popup.component.scss'],
})
export class RampUpValidationPopupComponent {
  constructor(public dialogRef: MatDialogRef<RampUpValidationPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
  public onClose(): void {
    this.dialogRef.close();
  }
}
