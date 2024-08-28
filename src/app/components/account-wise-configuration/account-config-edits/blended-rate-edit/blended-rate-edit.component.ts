import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BlendedRatesService } from 'src/app/core/services/blended-rates.service';
import { SuccessPopupComponent } from 'src/app/components/my-dashboard/success-popup/success-popup.component';

@Component({
  selector: 'app-blended-rate-edit',
  templateUrl: './blended-rate-edit.component.html',
  styleUrls: ['./blended-rate-edit.component.scss']
})
export class BlendedRateEditComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  manageAccountForm!: FormGroup;
  isAccountSelect = false;
  isProjectSelect = false;
  BlendedRateData: any;
  accountName: string = '';
  location: string = '';
  contractType: string = '';
  blendedRate!: number;
  initialBlendedRate!: number;
  projectName: string = '';
  projectType: string = '';
  rateTitle: string = '';
  typeTitle: string = '';
  probabilityInPercentage!: number;
  initialProbabilityInPercentage!: number;
  isBlendedRateBlank: boolean = false;
  isProbabilityBlank: boolean = false;

  constructor(private fb: FormBuilder, private blendedRatesService: BlendedRatesService,
    public dialog: MatDialog, public dialogRef: MatDialogRef<BlendedRateEditComponent>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.BlendedRateData = data?.BlendedRatesDetails;
    this.projectType = this.BlendedRateData.projectType;
    this.accountName = this.BlendedRateData.accountName;
    this.projectName = this.BlendedRateData.projectName;
    this.location = this.BlendedRateData.location;
    this.blendedRate = this.BlendedRateData.blendedRate;
    this.initialBlendedRate = this.blendedRate;
    this.probabilityInPercentage = this.BlendedRateData.probabilityInPercentage;
    this.initialProbabilityInPercentage = this.probabilityInPercentage;
      this.contractType = this.BlendedRateData.contractType;
  }

  ngOnInit(): void {
    this.manageAccountForm = this.fb.group({
      typeCtrl: [this.projectType, Validators.required],
      // accountCtrl: [this.accountName, Validators.required],
      // projectCtrl: [this.projectName, Validators.required],
      projectName: [this.projectName, Validators.required],
      accountName: [this.accountName, Validators.required],
      blendedRate: [this.blendedRate, Validators.required],
      contractType: [this.contractType, Validators.required],
      //probabilityInPercentage:[Validators.required, Validators.min(0), Validators.max(100)]
      probabilityInPercentage: new FormControl(this.probabilityInPercentage, [Validators.required, Validators.min(0), Validators.max(100)])
    });

    if (this.location.toLocaleLowerCase() == 'onsite'){
      this.rateTitle = 'Onsite Blended Rate:'
    } else {
      this.rateTitle = 'Offshore Blended Rate:'
    }

    if (this.projectType == 'EN') {
      this.typeTitle = 'Existing New'
    } else {
      this.typeTitle = 'Net New'
    }
  }

  isFormValid() {
    if ((this.initialBlendedRate != Number(this.manageAccountForm.get('blendedRate')?.value)) ||
      (this.initialProbabilityInPercentage != Number(this.manageAccountForm.get('probabilityInPercentage')?.value)) &&
      !this.manageAccountForm.get('probabilityInPercentage').hasError('max')) {
      return false;
    }
    return true;
  }

  onProbabilityChange(event: any) {
    if (event.target.value == "") {
      this.isProbabilityBlank = true
    } else this.isProbabilityBlank = false
  }

  onBlendedRateChange(event: any) {
    if (event.target.value == "") {
      this.isBlendedRateBlank = true
    } else this.isBlendedRateBlank = false
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onUpdate(): void {
    const updateBlandedRate: any = {
      accountId: this.BlendedRateData.accountId,
      accountName: this.BlendedRateData.accountName,
      accountManager: this.BlendedRateData.accountManager,
      projectId: this.BlendedRateData.projectId,
      projectName: this.BlendedRateData.projectName,
      location: this.BlendedRateData.location,
      projectType: this.BlendedRateData.projectType,
      blendedRate: Number(this.manageAccountForm.controls['blendedRate'].value),
      probabilityInPercentage: Number(this.manageAccountForm.controls['probabilityInPercentage'].value),
      contractType: this.BlendedRateData.contractType
    };
    this.blendedRatesService.updateBlandedRates(updateBlandedRate).subscribe((result) => {
      this.BlendedRateData.blendedRate = result.blendedRate;
      this.BlendedRateData.probabilityInPercentage = result.probabilityInPercentage;
      this.dialog.open(SuccessPopupComponent, {
        width: '530px',
        data: { message: 'Data Updated Successfully !' }
      });
      this.dialogRef.close();
    });

  }
}
