import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BlendedRateEditComponent } from 'src/app/components/account-wise-configuration/account-config-edits/blended-rate-edit/blended-rate-edit.component';

@Component({
  selector: 'app-bi-annually-filter',
  templateUrl: './bi-annually-filter.component.html',
  styleUrls: ['./bi-annually-filter.component.scss']
})
export class BiAnnuallyFilterComponent {
  isValueChanged = false;
  constructor(public dialogRef: MatDialogRef<BiAnnuallyFilterComponent>) {}

  duration = [
    {
      id: 1,
      name: 'H1',
    },
    {
      id: 2,
      name: 'H2',
    },
    {
      id: 3,
      name: 'H3',
    },
    {
      id: 4,
      name: 'H4',
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

