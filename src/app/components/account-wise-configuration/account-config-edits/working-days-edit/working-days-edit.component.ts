import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuccessPopupComponent } from 'src/app/components/my-dashboard/success-popup/success-popup.component';
import { WorkingDaysService } from 'src/app/core/services/working-days.service';

@Component({
  selector: 'app-working-days-edit',
  templateUrl: './working-days-edit.component.html',
  styleUrls: ['./working-days-edit.component.scss']
})
export class WorkingDaysEditComponent implements OnInit {
  editWorkingDaysForm!: FormGroup;
  workingDay: any;
  workingDayData: any;
  Max=false;
  months = [
    {
      name: 'Jan',
      ctrl:'janCtrl'
    },
    {
      name: 'Feb',
      ctrl:'febCtrl'
    },
    {
      name: 'Mar',
      ctrl:'marCtrl'
    },
    {
      name: 'Apr',
      ctrl:'aprCtrl'
    },
    {
      name: 'May',
      ctrl:'mayCtrl'
    },
    {
      name: 'Jun',
      ctrl:'junCtrl'
    },
    {
      name: 'Jul',
      ctrl:'julyCtrl'
    },
    {
      name: 'Aug',
      ctrl:'augCtrl'
    },
    {
      name: 'Sep',
      ctrl:'sepCtrl'
    },
    {
      name: 'Oct',
      ctrl:'octCtrl'
    },
    {
      name: 'Nov',
      ctrl:'novCtrl'
    },
    {
      name: 'Dec',
      ctrl:'decCtrl'
    }
  ];

  dataUpdated = false;
  accountName: string = '';
  location: string = '';
  jan!: number;
  feb!:number;
  mar!:number;
  apr!:number;
  may!:number;
  jun!:number;
  july!:number;
  aug!:number;
  sep!:number;
  oct!:number;
  nov!:number;
  dec!:number;
  currentYear: number;
  updateWorkingHoursDto!: any;
  constructor(public dialogRef: MatDialogRef<WorkingDaysEditComponent>, private router:Router, private dialog: MatDialog,
    private workingDaysService: WorkingDaysService,
    @Inject(MAT_DIALOG_DATA) public data: any)
   {
    this.workingDayData = data.workingDaysdata;
    this.location = this.workingDayData.location;
    this.accountName = this.workingDayData.accountName;
    this.jan = this.workingDayData.jan;
    this.feb = this.workingDayData.feb;
    this.mar = this.workingDayData.mar;
    this.apr = this.workingDayData.apr;
    this.may = this.workingDayData.may;
    this.jun = this.workingDayData.jun;
    this.july = this.workingDayData.july;
    this.aug = this.workingDayData.aug;
    this.sep = this.workingDayData.sep;
    this.oct = this.workingDayData.oct;
    this.nov = this.workingDayData.nov;
    this.dec = this.workingDayData.dec;
   }

   ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.editWorkingDaysForm = new FormGroup({
      janCtrl:  new FormControl(this.jan, [Validators.required, Validators.min(1), Validators.max(31)]),
      febCtrl: new FormControl(this.feb, [Validators.required, Validators.min(1), Validators.max(29)]),
      marCtrl: new FormControl(this.mar, [Validators.required, Validators.min(1), Validators.max(31)]),
      aprCtrl: new FormControl(this.apr, [Validators.required, Validators.min(1), Validators.max(31)]),
      mayCtrl: new FormControl(this.may, [Validators.required, Validators.min(1), Validators.max(31)]),
      junCtrl: new FormControl(this.jun, [Validators.required, Validators.min(1), Validators.max(31)]),
      julyCtrl: new FormControl(this.july, [Validators.required, Validators.min(1), Validators.max(31)]),
      augCtrl: new FormControl(this.aug, [Validators.required, Validators.min(1), Validators.max(31)]),
      sepCtrl: new FormControl(this.sep, [Validators.required, Validators.min(1), Validators.max(31)]),
      octCtrl: new FormControl(this.oct, [Validators.required, Validators.min(1), Validators.max(31)]),
      novCtrl: new FormControl(this.nov, [Validators.required, Validators.min(1), Validators.max(31)]),
      decCtrl: new FormControl(this.dec, [Validators.required, Validators.min(1), Validators.max(31)]),
    });
    // this.getDataById(
    //   this.workingDayData.accountId,
    //   this.workingDayData.location
    // );
  }

  // isDataUpdated() {
  //   this.dataUpdated = true;
  // }
  public onChange(event: any) {
    this.dataUpdated = (event.value > 31 || event.value == "" || event.value === 0)? false : true;
  }

  isFormValid() {
    return ! ((this.editWorkingDaysForm.get('janCtrl')?.value <= 31) &&
        (this.editWorkingDaysForm.get('febCtrl')?.value <= 29) &&
        (this.editWorkingDaysForm.get('marCtrl')?.value <= 31) &&
        (this.editWorkingDaysForm.get('aprCtrl')?.value <= 31) &&
        (this.editWorkingDaysForm.get('mayCtrl')?.value <= 31) &&
        (this.editWorkingDaysForm.get('junCtrl')?.value <= 31) &&
        (this.editWorkingDaysForm.get('julyCtrl')?.value <= 31) &&
        (this.editWorkingDaysForm.get('augCtrl')?.value <= 31) &&
        (this.editWorkingDaysForm.get('sepCtrl')?.value <= 31) &&
        (this.editWorkingDaysForm.get('octCtrl')?.value <= 31) &&
        (this.editWorkingDaysForm.get('novCtrl')?.value <= 31) &&
        (this.editWorkingDaysForm.get('decCtrl').value <= 31) &&
        this.dataUpdated && this.editWorkingDaysForm.valid
    )}
  // getDataById(id: number, location: string) {
  //   this.workingDaysService
  //     .getWorkingDaysById(id, location)
  //     .subscribe((result) => {
  //       this.updateWorkingHoursDto = result;
  //       console.log('result', result);
  //     });
  // }
  public onClose(): void {
    this.dialogRef.close();
  }

  public onUpdate(): void {
    if (this.editWorkingDaysForm.valid){
    const updateWorkingDays: any = {
      accountId: this.workingDayData.accountId,
      accountManager: this.workingDayData.accountManager,
      location: this.workingDayData.location,
      type : this.workingDayData.type,
      accountName : this.workingDayData.accountName,
      jan :Number(this.editWorkingDaysForm.controls['janCtrl'].value),
    feb : Number(this.editWorkingDaysForm.controls['febCtrl'].value),
    mar : Number(this.editWorkingDaysForm.controls['marCtrl'].value),
    apr : Number(this.editWorkingDaysForm.controls['aprCtrl'].value),
    may : Number(this.editWorkingDaysForm.controls['mayCtrl'].value),
    jun : Number(this.editWorkingDaysForm.controls['junCtrl'].value),
    july :Number( this.editWorkingDaysForm.controls['julyCtrl'].value),
    aug : Number(this.editWorkingDaysForm.controls['augCtrl'].value),
    sep : Number(this.editWorkingDaysForm.controls['sepCtrl'].value),
    oct : Number(this.editWorkingDaysForm.controls['octCtrl'].value),
    nov : Number(this.editWorkingDaysForm.controls['novCtrl'].value),
    dec : Number(this.editWorkingDaysForm.controls['decCtrl'].value),
    };
    this.workingDaysService
      .updateWorkingDays(updateWorkingDays)
      .subscribe((result) => {
        this.workingDayData.jan = result.jan;
        this.workingDayData.feb = result.feb;
        this.workingDayData.mar = result.mar;
        this.workingDayData.apr = result.apr;
        this.workingDayData.may = result.may;
        this.workingDayData.jun = result.jun;
        this.workingDayData.july = result.july;
        this.workingDayData.aug = result.aug;
        this.workingDayData.sep = result.sep;
        this.workingDayData.oct = result.oct;
        this.workingDayData.nov = result.nov;
        this.workingDayData.dec = result.dec;
        this.dialog.open(SuccessPopupComponent,{
          width: '530px',
          data: { message: 'Data Updated Successfully !' }
        });
        this.dialogRef.close();
      });
  }
}
}
