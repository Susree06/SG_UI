import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quaterly-filter',
  templateUrl: './quaterly-filter.component.html',
  styleUrls: ['./quaterly-filter.component.scss']
})
export class QuaterlyFilterComponent {
  isValueChanged = false;
  constructor(public dialogRef: MatDialogRef<QuaterlyFilterComponent>) {}


  duration = [
    {
      id: 1,
      name: 'Q1',
    },
    {
      id: 2,
      name: 'Q2',
    },
    {
      id: 3,
      name: 'Q3',
    },
    {
      id: 4,
      name: 'Q4',
    },
  ];

  public onClose(): void {
    this.dialogRef.close();
  }

  public onApply(): void {
    this.dialogRef.close();
  }

  valueChanged(event:any) {
    if (event) {
      this.isValueChanged = true;
    } else {
      this.isValueChanged = false;
    }
  }
}
