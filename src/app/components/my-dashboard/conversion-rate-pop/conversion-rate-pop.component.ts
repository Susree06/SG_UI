import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateNewAccountComponent } from '../../account-wise-configuration/create-new-account/create-new-account.component';
import { ConversionRateService } from 'src/app/core/services/conversionrate.service';
import { DatePipe, formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { SuccessPopupComponent } from '../success-popup/success-popup.component';

@Component({
  selector: 'app-conversion-rate-pop',
  templateUrl: './conversion-rate-pop.component.html',
  styleUrls: ['./conversion-rate-pop.component.scss']
})
export class ConversionRatePopComponent implements OnInit {

  conversionRateForm!: FormGroup;
  minDate: string;
  isReadOnly: boolean;
  public isError : boolean = false;
  public isProjError : boolean = false;
  public isDisable : boolean = false;
  public conversionData : any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateNewAccountComponent>, private router:Router,
    public conversionRateService : ConversionRateService,private datePipe: DatePipe , 
    private dialog :MatDialog
   ) {
    console.log(data);
    this.conversionData = data?.ConversionRate;
    this.isReadOnly = data?.isReadOnly;
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    this.minDate = formatDate(firstDayOfMonth, 'yyyy-MM-dd', 'en-US');
   }

  ngOnInit(): void {
    if (this.isReadOnly) {
      this.conversionRateForm = this.fb.group({
        conversionCurrency: { value: this.conversionData.currency, disabled: true },
        rate: [this.conversionData.rate, Validators.required],
        fromDate: [this.conversionData.fromDate, Validators.required],
      });
    } else {
      this.conversionData = {};
      this.conversionRateForm = this.fb.group({
        conversionCurrency: ['', Validators.required],
        rate: ['', Validators.required],
        fromDate: ['', Validators.required],
      });
    }

  }


  addEvent(event: MatDatepickerInputEvent<Date>) {
    fromDate: event.value;
  }


  public onChange(event: any) {
    if (event.value != '' && event.value != null && event.value != undefined
      && event.value < 0) {
      this.conversionRateForm.get('rate')?.setValue(0);
    }
  }

  isFormValid() {
      return !(
        this.conversionRateForm.get('conversionCurrency')?.value &&
        this.conversionRateForm.get('rate')?.value &&
        this.conversionRateForm.get('fromDate')?.value
      );
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onApply(): void {

    this.conversionData.rate = this.conversionRateForm.get('rate')?.value;
    this.conversionData.fromDate = this.datePipe.transform(this.conversionRateForm.get('fromDate')?.value, 'yyyy-MM-dd');
    this.conversionData.currency = this.conversionRateForm.get('conversionCurrency')?.value;
    
    this.conversionRateService.ConversionRateUpdate(this.conversionData).subscribe({
      next: (res: any) => {
        this.dialog.open(SuccessPopupComponent,{
          width: '530px',
          data: { message: 'Data Updated Successfully !' }
        });
        this.dialogRef.close();
      }
    });
  }

}
