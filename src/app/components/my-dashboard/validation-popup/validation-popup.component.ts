import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-validation-popup',
  templateUrl: './validation-popup.component.html',
  styleUrls: ['./validation-popup.component.scss']
})
export class ValidationPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string ,title:string}) {}
}
