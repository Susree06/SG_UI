import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LeavesService } from 'src/app/core/services/leaves.service';
import { SuccessPopupComponent } from 'src/app/components/my-dashboard/success-popup/success-popup.component';

@Component({
  selector: 'app-leaves-in-percentage-edit',
  templateUrl: './leaves-in-percentage-edit.component.html',
  styleUrls: ['./leaves-in-percentage-edit.component.scss']
})
export class LeavesInPercentageEditComponent {
  editLeavesForm!: FormGroup;
  leaves: any;
  leavesData: any;
  Max=false;
  months = [
    {
      name: 'Jan',
      ctrl: 'janCtrl'
    },
    {
      name: 'Feb',
      ctrl: 'febCtrl'
    },
    {
      name: 'Mar',
      ctrl: 'marCtrl'
    },
    {
      name: 'Apr',
      ctrl: 'aprCtrl'
    },
    {
      name: 'May',
      ctrl: 'mayCtrl'
    },
    {
      name: 'Jun',
      ctrl: 'junCtrl'
    },
    {
      name: 'Jul',
      ctrl: 'julyCtrl'
    },
    {
      name: 'Aug',
      ctrl: 'augCtrl'
    },
    {
      name: 'Sep',
      ctrl: 'sepCtrl'
    },
    {
      name: 'Oct',
      ctrl: 'octCtrl'
    },
    {
      name: 'Nov',
      ctrl: 'novCtrl'
    },
    {
      name: 'Dec',
      ctrl: 'decCtrl'
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
  updateLeavesDto!: any;
  isChecked : boolean= false;
  constructor(public dialogRef: MatDialogRef<LeavesInPercentageEditComponent>, private router:Router, private dialog: MatDialog,
    private leavesService: LeavesService,
    @Inject(MAT_DIALOG_DATA) public data: any)
   {
    this.leavesData = data.leaveData;
    this.location = this.leavesData.location;
    this.accountName = this.leavesData.accountName;
    this.jan = this.leavesData.jan;
    this.feb = this.leavesData.feb;
    this.mar = this.leavesData.mar;
    this.apr = this.leavesData.apr;
    this.may = this.leavesData.may;
    this.jun = this.leavesData.jun;
    this.july = this.leavesData.july;
    this.aug = this.leavesData.aug;
    this.sep = this.leavesData.sep;
    this.oct = this.leavesData.oct;
    this.nov = this.leavesData.nov;
    this.dec = this.leavesData.dec;
   }

   ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    // if(!this.isChecked)
    // {
    this.editLeavesForm = new FormGroup({
      janCtrl:  new FormControl(this.jan, [Validators.required, Validators.min(0), Validators.max(100)]),
      febCtrl: new FormControl(this.feb, [Validators.required, Validators.min(0), Validators.max(100)]),
      marCtrl: new FormControl(this.mar, [Validators.required, Validators.min(0), Validators.max(100)]),
      aprCtrl: new FormControl(this.apr, [Validators.required, Validators.min(0), Validators.max(100)]),
      mayCtrl: new FormControl(this.may, [Validators.required, Validators.min(0), Validators.max(100)]),
      junCtrl: new FormControl(this.jun, [Validators.required, Validators.min(0), Validators.max(100)]),
      julyCtrl: new FormControl(this.july, [Validators.required, Validators.min(0), Validators.max(100)]),
      augCtrl: new FormControl(this.aug, [Validators.required, Validators.min(0), Validators.max(100)]),
      sepCtrl: new FormControl(this.sep, [Validators.required, Validators.min(0), Validators.max(100)]),
      octCtrl: new FormControl(this.oct, [Validators.required, Validators.min(0), Validators.max(100)]),
      novCtrl: new FormControl(this.nov, [Validators.required, Validators.min(0), Validators.max(100)]),
      decCtrl: new FormControl(this.dec, [Validators.required, Validators.min(0), Validators.max(100)]),
    });
  // }
  // else{
  //   this.editLeavesForm = new FormGroup({
  //     janCtrl:  new FormControl(this.jan, [Validators.required, Validators.min(0), Validators.max(2)]),
  //     febCtrl: new FormControl(this.feb, [Validators.required, Validators.min(0), Validators.max(2)]),
  //     marCtrl: new FormControl(this.mar, [Validators.required, Validators.min(0), Validators.max(2)]),
  //     aprCtrl: new FormControl(this.apr, [Validators.required, Validators.min(0), Validators.max(2)]),
  //     mayCtrl: new FormControl(this.may, [Validators.required, Validators.min(0), Validators.max(2)]),
  //     junCtrl: new FormControl(this.jun, [Validators.required, Validators.min(0), Validators.max(2)]),
  //     julyCtrl: new FormControl(this.july, [Validators.required, Validators.min(0), Validators.max(2)]),
  //     augCtrl: new FormControl(this.aug, [Validators.required, Validators.min(0), Validators.max(2)]),
  //     sepCtrl: new FormControl(this.sep, [Validators.required, Validators.min(0), Validators.max(2)]),
  //     octCtrl: new FormControl(this.oct, [Validators.required, Validators.min(0), Validators.max(2)]),
  //     novCtrl: new FormControl(this.nov, [Validators.required, Validators.min(0), Validators.max(2)]),
  //     decCtrl: new FormControl(this.dec, [Validators.required, Validators.min(0), Validators.max(2)]),
  //   });
  // }
  }
  onChecked()
  {
    this.isChecked = !this.isChecked;
    this.dataUpdated = true;
    // if(this.isChecked)
    // {
    //   this.dataUpdated = true;
    //   this.editLeavesForm = new FormGroup({
    //     janCtrl:  new FormControl(this.jan, [Validators.required, Validators.min(0), Validators.max(2)]),
    //     febCtrl: new FormControl(this.feb, [Validators.required, Validators.min(0), Validators.max(2)]),
    //     marCtrl: new FormControl(this.mar, [Validators.required, Validators.min(0), Validators.max(2)]),
    //     aprCtrl: new FormControl(this.apr, [Validators.required, Validators.min(0), Validators.max(2)]),
    //     mayCtrl: new FormControl(this.may, [Validators.required, Validators.min(0), Validators.max(2)]),
    //     junCtrl: new FormControl(this.jun, [Validators.required, Validators.min(0), Validators.max(2)]),
    //     julyCtrl: new FormControl(this.july, [Validators.required, Validators.min(0), Validators.max(2)]),
    //     augCtrl: new FormControl(this.aug, [Validators.required, Validators.min(0), Validators.max(2)]),
    //     sepCtrl: new FormControl(this.sep, [Validators.required, Validators.min(0), Validators.max(2)]),
    //     octCtrl: new FormControl(this.oct, [Validators.required, Validators.min(0), Validators.max(2)]),
    //     novCtrl: new FormControl(this.nov, [Validators.required, Validators.min(0), Validators.max(2)]),
    //     decCtrl: new FormControl(this.dec, [Validators.required, Validators.min(0), Validators.max(2)]),
    //   });
    // }else{
      this.editLeavesForm = new FormGroup({
        janCtrl:  new FormControl(this.jan, [Validators.required, Validators.min(0), Validators.max(100)]),
        febCtrl: new FormControl(this.feb, [Validators.required, Validators.min(0), Validators.max(100)]),
        marCtrl: new FormControl(this.mar, [Validators.required, Validators.min(0), Validators.max(100)]),
        aprCtrl: new FormControl(this.apr, [Validators.required, Validators.min(0), Validators.max(100)]),
        mayCtrl: new FormControl(this.may, [Validators.required, Validators.min(0), Validators.max(100)]),
        junCtrl: new FormControl(this.jun, [Validators.required, Validators.min(0), Validators.max(100)]),
        julyCtrl: new FormControl(this.july, [Validators.required, Validators.min(0), Validators.max(100)]),
        augCtrl: new FormControl(this.aug, [Validators.required, Validators.min(0), Validators.max(100)]),
        sepCtrl: new FormControl(this.sep, [Validators.required, Validators.min(0), Validators.max(100)]),
        octCtrl: new FormControl(this.oct, [Validators.required, Validators.min(0), Validators.max(100)]),
        novCtrl: new FormControl(this.nov, [Validators.required, Validators.min(0), Validators.max(100)]),
        decCtrl: new FormControl(this.dec, [Validators.required, Validators.min(0), Validators.max(100)]),
      });
    //}
  }

  public onChange(event : any) {
    // if(this.isChecked)
    // {
    //    this.dataUpdated = (event.value > 2 || event.value == "")? false : true;
    // }
    // else{
      this.dataUpdated = (event.value > 100 || event.value == "")? false : true;
    //}
  }

  isFormValid() {
    // if (this.isChecked) {
    //   return !(
    //     (this.editLeavesForm.get('janCtrl')?.value <= 2) &&
    //     (this.editLeavesForm.get('febCtrl')?.value <= 2) &&
    //     (this.editLeavesForm.get('marCtrl')?.value <= 2) &&
    //     (this.editLeavesForm.get('aprCtrl')?.value <= 2) &&
    //     (this.editLeavesForm.get('mayCtrl')?.value <= 2) &&
    //     (this.editLeavesForm.get('junCtrl')?.value <= 2) &&
    //     (this.editLeavesForm.get('julyCtrl')?.value <= 2) &&
    //     (this.editLeavesForm.get('augCtrl')?.value <= 2) &&
    //     (this.editLeavesForm.get('sepCtrl')?.value <= 2) &&
    //     (this.editLeavesForm.get('octCtrl')?.value <= 2) &&
    //     (this.editLeavesForm.get('novCtrl')?.value <= 2) &&
    //     (this.editLeavesForm.get('decCtrl').value <= 2) &&
    //     this.dataUpdated
    //   );
    // } else {
      return !(
        (this.editLeavesForm.get('janCtrl')?.value <= 100) &&
        (this.editLeavesForm.get('febCtrl')?.value <= 100) &&
        (this.editLeavesForm.get('marCtrl')?.value <= 100) &&
        (this.editLeavesForm.get('aprCtrl')?.value <= 100) &&
        (this.editLeavesForm.get('mayCtrl')?.value <= 100) &&
        (this.editLeavesForm.get('junCtrl')?.value <= 100) &&
        (this.editLeavesForm.get('julyCtrl')?.value <= 100) &&
        (this.editLeavesForm.get('augCtrl')?.value <= 100) &&
        (this.editLeavesForm.get('sepCtrl')?.value <= 100) &&
        (this.editLeavesForm.get('octCtrl')?.value <= 100) &&
        (this.editLeavesForm.get('novCtrl')?.value <= 100) &&
        (this.editLeavesForm.get('decCtrl').value <= 100) &&
        this.dataUpdated
      );
    //}
  }


  public onClose(): void {
    this.dialogRef.close();
  }

  public onUpdate(): void {
    if (this.editLeavesForm.valid){
    const updateWorkingDays: any = {
      accountId: this.leavesData.accountId,
      accountManager: this.leavesData.accountManager,
      location: this.leavesData.location,
      type : this.leavesData.type,
      accountName : this.leavesData.accountName,
      jan :Number(this.editLeavesForm.controls['janCtrl'].value),
    feb : Number(this.editLeavesForm.controls['febCtrl'].value),
    mar : Number(this.editLeavesForm.controls['marCtrl'].value),
    apr : Number(this.editLeavesForm.controls['aprCtrl'].value),
    may : Number(this.editLeavesForm.controls['mayCtrl'].value),
    jun : Number(this.editLeavesForm.controls['junCtrl'].value),
    july :Number( this.editLeavesForm.controls['julyCtrl'].value),
    aug : Number(this.editLeavesForm.controls['augCtrl'].value),
    sep : Number(this.editLeavesForm.controls['sepCtrl'].value),
    oct : Number(this.editLeavesForm.controls['octCtrl'].value),
    nov : Number(this.editLeavesForm.controls['novCtrl'].value),
    dec : Number(this.editLeavesForm.controls['decCtrl'].value),
    };
    this.leavesService
      .updateLeaves(updateWorkingDays)
      .subscribe((result) => {
        this.leavesData.jan = result.jan;
        this.leavesData.feb = result.feb;
        this.leavesData.mar = result.mar;
        this.leavesData.apr = result.apr;
        this.leavesData.may = result.may;
        this.leavesData.jun = result.jun;
        this.leavesData.july = result.july;
        this.leavesData.aug = result.aug;
        this.leavesData.sep = result.sep;
        this.leavesData.oct = result.oct;
        this.leavesData.nov = result.nov;
        this.leavesData.dec = result.dec;
        this.dialog.open(SuccessPopupComponent,{
          width: '530px',
          data: { message: 'Data Updated Successfully !' }
        });
        this.dialogRef.close();
      });
  }
}
}
