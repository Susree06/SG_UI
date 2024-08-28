import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss']
})
export class HolidayListComponent implements OnInit {

  currentLocationId!: number;
  manageAccountForm!: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<HolidayListComponent>) {}

  ngOnInit(): void {
    this.currentLocationId = 1;
    this.manageAccountForm = this.fb.group({
      accountCtrl: [1]
    });
  }
  location = [
    {id: 1, name: 'Offshore'},
    {id: 2, name: 'Onsite'}
  ];
  public onClose(): void {
    this.dialogRef.close();
  }

  valueChanged(event:any) {
    this.currentLocationId = event;

  }
}
