import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-failed-popup',
  templateUrl: './failed-popup.component.html',
  styleUrls: ['./failed-popup.component.scss']
})
export class FailedPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
