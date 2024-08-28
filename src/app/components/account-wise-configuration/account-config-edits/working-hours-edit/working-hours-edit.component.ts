import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuccessPopupComponent } from 'src/app/components/my-dashboard/success-popup/success-popup.component';
import { WorkingHours } from 'src/app/core/models/account-wise-configuration.model';
import { WorkingHoursService } from 'src/app/core/services/working-hours.service';

@Component({
  selector: 'app-working-hours-edit',
  templateUrl: './working-hours-edit.component.html',
  styleUrls: ['./working-hours-edit.component.scss'],
})
export class WorkingHoursEditComponent implements OnInit {
  editWorkingHoursForm!: FormGroup;
  dataUpdated = false;
  accountName: string = '';
  location: string = '';
  workingHour: any;
  workingHourData: any;
  currentYear: number;
  constructor(
    public dialogRef: MatDialogRef<WorkingHoursEditComponent>,
    private router: Router,
    private dialog: MatDialog,
    private workingHoursService: WorkingHoursService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.workingHourData = data.workingHoursdata;
    this.location = this.workingHourData.location;
    this.accountName = this.workingHourData.accountName;
    this.workingHour = this.workingHourData.workingHours;
  }
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.editWorkingHoursForm = new FormGroup({
      hoursCtrl: new FormControl(this.workingHour, [Validators.required, Validators.min(0), Validators.max(12)]),
    });
  }


  public onChange(event: any) {
    if (event.value != '' && event.value != null && event.value != undefined
    && event.value != this.workingHour)
     {
      this.editWorkingHoursForm.get('hoursCtrl')?.setValue(event.value);
      this.dataUpdated = true;
    }
    else{
      this.dataUpdated = false;
    }
    if(event.value > 12)
    {
      this.dataUpdated = false;
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }
  public onUpdate(): void {
    if (this.editWorkingHoursForm.valid){
    const updateWorkingHours: any = {
      workingHours: this.editWorkingHoursForm.controls['hoursCtrl'].value,
      accountName:this.workingHourData.accountName,
      accountId: this.workingHourData.accountId,
      accountManager: this.workingHourData.accountManager,
      location: this.workingHourData.location,
    };
    this.workingHoursService
      .updateWorkingHours(updateWorkingHours)
      .subscribe((result) => {
        this.workingHourData.workingHours = result.workingHours;
        this.dialog.open(SuccessPopupComponent,{
          width: '530px',
          data: { message: 'Data Updated Successfully !' }
        });
        this.dialogRef.close();
      });
  }
}
}
