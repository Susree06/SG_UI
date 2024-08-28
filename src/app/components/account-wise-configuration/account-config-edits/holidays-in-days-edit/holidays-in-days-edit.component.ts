import { SuccessPopupComponent } from './../../../my-dashboard/success-popup/success-popup.component';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HolidayListComponent } from '../holiday-list/holiday-list.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HolidaysService } from 'src/app/core/services/holidays-service';
import { validateBasis } from '@angular/flex-layout';

@Component({
  selector: 'app-holidays-in-days-edit',
  templateUrl: './holidays-in-days-edit.component.html',
  styleUrls: ['./holidays-in-days-edit.component.scss'],
})
export class HolidaysInDaysEditComponent implements OnInit {
  currentYear: number;
  months = [
    {
      name: 'Jan',
      ctrl: 'janCtrl',
    },
    {
      name: 'Feb',
      ctrl: 'febCtrl',
    },
    {
      name: 'Mar',
      ctrl: 'marCtrl',
    },
    {
      name: 'Apr',
      ctrl: 'aprCtrl',
    },
    {
      name: 'May',
      ctrl: 'mayCtrl',
    },
    {
      name: 'Jun',
      ctrl: 'junCtrl',
    },
    {
      name: 'Jul',
      ctrl: 'julyCtrl',
    },
    {
      name: 'Aug',
      ctrl: 'augCtrl',
    },
    {
      name: 'Sep',
      ctrl: 'sepCtrl',
    },
    {
      name: 'Oct',
      ctrl: 'octCtrl',
    },
    {
      name: 'Nov',
      ctrl: 'novCtrl',
    },
    {
      name: 'Dec',
      ctrl: 'decCtrl',
    },
  ];

  editHolidaysForm!: FormGroup;
  dataUpdated = false;
  accountName: string = '';
  location: string = '';
  public Holidays: any;
  public HolidaysData: any;
  jan!: number;
  feb!: number;
  mar!: number;
  apr!: number;
  may!: number;
  jun!: number;
  july!: number;
  aug!: number;
  sep!: number;
  oct!: number;
  nov!: number;
  dec!: number;

  constructor(
    public dialogRef: MatDialogRef<HolidaysInDaysEditComponent>,
    private router: Router,
    private dialog: MatDialog,
    private holidaysService: HolidaysService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.HolidaysData = data.HolidaysDetails;
    this.location = this.HolidaysData.location;
    this.accountName = this.HolidaysData.accountName;
    this.jan = this.HolidaysData.jan;
    this.feb = this.HolidaysData.feb;
    this.mar = this.HolidaysData.mar;
    this.apr = this.HolidaysData.apr;
    this.may = this.HolidaysData.may;
    this.jun = this.HolidaysData.jun;
    this.july = this.HolidaysData.july;
    this.aug = this.HolidaysData.aug;
    this.sep = this.HolidaysData.sep;
    this.oct = this.HolidaysData.oct;
    this.nov = this.HolidaysData.nov;
    this.dec = this.HolidaysData.dec;
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.editHolidaysForm = new FormGroup({
      janCtrl: new FormControl(this.jan, [Validators.required, Validators.min(0), Validators.max(10)]),
      febCtrl: new FormControl(this.feb, [Validators.required, Validators.min(0), Validators.max(10)]),
      marCtrl: new FormControl(this.mar, [Validators.required, Validators.min(0), Validators.max(10)]),
      aprCtrl: new FormControl(this.apr, [Validators.required, Validators.min(0), Validators.max(10)]),
      mayCtrl: new FormControl(this.may, [Validators.required, Validators.min(0), Validators.max(10)]),
      junCtrl: new FormControl(this.jun, [Validators.required, Validators.min(0), Validators.max(10)]),
      julyCtrl: new FormControl(this.july, [Validators.required, Validators.min(0), Validators.max(10)]),
      augCtrl: new FormControl(this.aug, [Validators.required, Validators.min(0), Validators.max(10)]),
      sepCtrl: new FormControl(this.sep, [Validators.required, Validators.min(0), Validators.max(10)]),
      octCtrl: new FormControl(this.oct, [Validators.required, Validators.min(0), Validators.max(10)]),
      novCtrl: new FormControl(this.nov, [Validators.required, Validators.min(0), Validators.max(10)]),
      decCtrl: new FormControl(this.dec, [Validators.required, Validators.min(0), Validators.max(10)]),
    });
  }

  // isDataUpdated() {
  //   this.dataUpdated = true;
  // }

  public onChange(event: any) {
    // if (this.editHolidaysForm.value != null) {
    //   this.editHolidaysForm.get('daysCtrl')?.setValue(event.value);
    // }
    this.dataUpdated = (event.value > 10 || event.value == "") ? false : true;
  }

  isFormValid() {
    return !((this.editHolidaysForm.get('janCtrl')?.value <= 10) &&
      (this.editHolidaysForm.get('febCtrl')?.value <= 10) &&
      (this.editHolidaysForm.get('marCtrl')?.value <= 10) &&
      (this.editHolidaysForm.get('aprCtrl')?.value <= 10) &&
      (this.editHolidaysForm.get('mayCtrl')?.value <= 10) &&
      (this.editHolidaysForm.get('junCtrl')?.value <= 10) &&
      (this.editHolidaysForm.get('julyCtrl')?.value <= 10) &&
      (this.editHolidaysForm.get('augCtrl')?.value <= 10) &&
      (this.editHolidaysForm.get('sepCtrl')?.value <= 10) &&
      (this.editHolidaysForm.get('octCtrl')?.value <= 10) &&
      (this.editHolidaysForm.get('novCtrl')?.value <= 10) &&
      (this.editHolidaysForm.get('decCtrl').value <= 10) &&
      this.dataUpdated
    )
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onUpdate(): void {
    if (this.editHolidaysForm.valid) {
      const updateHolidays: any = {
        accountId: this.HolidaysData.accountId,
        accountManager: this.HolidaysData.accountManager,
        location: this.HolidaysData.location,
        type: this.HolidaysData.type,
        jan: Number(this.editHolidaysForm.controls['janCtrl'].value),
        feb: Number(this.editHolidaysForm.controls['febCtrl'].value),
        mar: Number(this.editHolidaysForm.controls['marCtrl'].value),
        apr: Number(this.editHolidaysForm.controls['aprCtrl'].value),
        may: Number(this.editHolidaysForm.controls['mayCtrl'].value),
        jun: Number(this.editHolidaysForm.controls['junCtrl'].value),
        july: Number(this.editHolidaysForm.controls['julyCtrl'].value),
        aug: Number(this.editHolidaysForm.controls['augCtrl'].value),
        sep: Number(this.editHolidaysForm.controls['sepCtrl'].value),
        oct: Number(this.editHolidaysForm.controls['octCtrl'].value),
        nov: Number(this.editHolidaysForm.controls['novCtrl'].value),
        dec: Number(this.editHolidaysForm.controls['decCtrl'].value),
      };
      this.holidaysService.updateHolidays(updateHolidays).subscribe((result) => {
        this.HolidaysData.jan = result.jan;
        this.HolidaysData.feb = result.feb;
        this.HolidaysData.mar = result.mar;
        this.HolidaysData.apr = result.apr;
        this.HolidaysData.may = result.mar;
        this.HolidaysData.jun = result.jun;
        this.HolidaysData.july = result.july;
        this.HolidaysData.aug = result.aug;
        this.HolidaysData.sep = result.sep;
        this.HolidaysData.oct = result.oct;
        this.HolidaysData.nov = result.nov;
        this.HolidaysData.dec = result.dec;
        this.dialog.open(SuccessPopupComponent, {
          width: '530px',
          data: { message: 'Data Updated Successfully !' }
        });
        this.dialogRef.close();
      });
    }
  }

  onShowHoliday() {
    const dialogRef = this.dialog.open(HolidayListComponent, {
      width: '750px',
      height: '650px',
    });
  }
}
