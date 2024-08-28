import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, min } from 'rxjs';
import { AccountDetails } from 'src/app/core/models/account-wise-configuration.model';
import { AccountService } from 'src/app/core/services/account.service';
import { BlendedRatesService } from 'src/app/core/services/blended-rates.service';
import { SuccessPopupComponent } from '../../my-dashboard/success-popup/success-popup.component';

@Component({
  selector: 'app-create-new-account',
  templateUrl: './create-new-account.component.html',
  styleUrls: ['./create-new-account.component.scss'],
})
export class CreateNewAccountComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  manageAccountForm!: FormGroup;
  isAccountSelect = false;
  isProjectSelect = false;
  public AccountsList!: AccountDetails[];
  public isError: boolean = false;
  public isProjError: boolean = false;
  public isDisable: boolean = false;
  public isTm: boolean = false;
  public ContractType: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateNewAccountComponent>,
    private router: Router,
    private accountService: AccountService,
    private blendedRatesService: BlendedRatesService,
    private dialog : MatDialog
  ) {}

  ngOnInit(): void {
    this.manageAccountForm = this.fb.group({
      typeCtrl: [1, Validators.required],
      accountCtrl: [''],
      projectCtrl: [''],
      projectName: [''],
      accountName: [''],
      onSiteRate: [''],
      offShoreRate: [''],
      probabilityForm: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      contractType: ['', Validators.required],
    });
    this.ContractType = [
      { id: 1, Type: 'T & M' },
      { id: 2, Type: 'Fixed Price' },
      { id: 3, Type: 'Fixed Monthly Billing' },
    ];

    this.accountService.getAllAccounts().subscribe((data) => {
      this.AccountsList = data;
    });

    this.manageAccountForm.get('accountName').valueChanges.subscribe((x) => {
      this.isError = false;
    });

    this.manageAccountForm.get('projectName').valueChanges.subscribe((x) => {
      this.isProjError = false;
    });

    this.manageAccountForm
      .get('probabilityForm')
      .valueChanges.subscribe((x) => {
        if (x > 100) {
          this.isDisable = true;
        }
      });
  }

  radioGroup = [
    {
      id: 1,
      name: 'Existing New',
    },
    {
      id: 2,
      name: 'New New',
    },
  ];

  onAccountChange() {
    this.isError = false;
  }

  onProjectChange() {
    this.isProjError = false;
  }

  onTypeChange(event: any) {
    this.manageAccountForm.setValue({
      typeCtrl: event?.value,
      accountCtrl: null,
      projectCtrl: null,
      projectName: null,
      accountName: null,
      onSiteRate: null,
      offShoreRate: null,
      probabilityForm: null,
      contractType: null,
    });
    this.isError = false;
    this.isProjError = false;

    if (event.value == 1) {
      this.manageAccountForm = this.fb.group({
        typeCtrl: [1, Validators.required],
        accountCtrl: [''],
        projectCtrl: [''],
        projectName: [''],
        accountName: [''],
        onSiteRate: [''],
        offShoreRate: [''],
        probabilityForm: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        contractType: ['', Validators.required],
      });
    } else {
      this.manageAccountForm = this.fb.group({
        typeCtrl: [2, Validators.required],
        accountCtrl: [''],
        projectCtrl: [''],
        projectName: [''],
        accountName: ['', Validators.required],
        onSiteRate: [''],
        offShoreRate: [''],
        probabilityForm: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        contractType: ['', Validators.required],
      });
    }
  }

  isFormValid() {
       const contractType = this.manageAccountForm.get('contractType')?.value;
       const onSiteRate = this.manageAccountForm.get('onSiteRate')?.value;
       const offShoreRate = this.manageAccountForm.get('offShoreRate')?.value;      
       const isValidRate = (rate: any) => rate !== null && rate !== '' && rate >= 0;
       
       this.isTm = contractType === 'T & M'
         ? isValidRate(onSiteRate) && isValidRate(offShoreRate)
         : contractType !== '' && contractType !== null && contractType !== undefined;
    if (this.manageAccountForm.get('typeCtrl')?.value === 1) {
      return !(
        this.manageAccountForm.get('accountCtrl')?.value &&
        this.manageAccountForm.get('projectName')?.value &&
        this.isTm &&
        this.manageAccountForm.get('probabilityForm')?.value &&
        //( this.manageAccountForm.get('contractType')?.value == 'T&M' ||  &&
        !(this.manageAccountForm.get('probabilityForm').value > 100)
      );
    } else if (this.manageAccountForm.get('typeCtrl')?.value === 2) {
      return !(
        this.manageAccountForm.get('accountName')?.value &&
        this.manageAccountForm.get('projectName')?.value &&
        this.isTm &&
        this.manageAccountForm.get('probabilityForm')?.value &&
        this.manageAccountForm.get('contractType')?.value &&
        !(this.manageAccountForm.get('probabilityForm').value > 100)
      );
    } else {
      return !(
        this.manageAccountForm.get('typeCtrl')?.value &&
        this.manageAccountForm.get('accountCtrl')?.value &&
        this.manageAccountForm.get('projectCtrl')?.value &&
        this.manageAccountForm.get('contractType')?.value &&
        this.manageAccountForm.get('probabilityForm').value > 100
      );
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onApply(): void {
    if(this.manageAccountForm.valid){
    const addNewAccount: any = {
      accountId: Number(this.manageAccountForm.controls['accountCtrl'].value),
      accountName: this.manageAccountForm.controls['accountName'].value,
      projectName: this.manageAccountForm.controls['projectName'].value,
      projectType:
        this.manageAccountForm.controls['typeCtrl'].value == 1 ? 'EN' : 'NN',
      offshoreBlendedRate: Number(
        this.manageAccountForm.controls['offShoreRate'].value
      ),
      onsiteBlendedRate: Number(
        this.manageAccountForm.controls['onSiteRate'].value
      ),
      probabilityInPercentage: Number(
        this.manageAccountForm.controls['probabilityForm'].value
      ),
      contractType: this.manageAccountForm.controls['contractType'].value,
    };
    this.isError = false;
    this.isProjError = false;
    this.blendedRatesService.addNew(addNewAccount).subscribe((result) => {
      if (
        result.accountName == null &&
        this.manageAccountForm.controls['typeCtrl'].value === 2
      ) {
        this.isError = true;
      } else if (
        result.accountName == null &&
        this.manageAccountForm.controls['typeCtrl'].value === 1
      ) {
        this.isProjError = true;
      } else {
        this.dialog.open(SuccessPopupComponent, {
          width: '530px',
          data: { message: 'Data Added Successfully !' }
        });
        this.dialogRef.close();
      }
    });
  }
}

  public contactTypeCheck(type) {
    if (type.value.trim() != 'T & M') {
      this.manageAccountForm.controls['onSiteRate'].reset();
      this.manageAccountForm.controls['offShoreRate'].reset();
      this.manageAccountForm.controls['onSiteRate'].disable();
      this.manageAccountForm.controls['offShoreRate'].disable();
      this.manageAccountForm.controls['onSiteRate'].clearValidators();
      this.manageAccountForm.controls['offShoreRate'].clearValidators();
    } else {
      this.manageAccountForm.controls['onSiteRate'].enable();
      this.manageAccountForm.controls['offShoreRate'].enable();
      this.manageAccountForm.controls['onSiteRate'].setValidators([
        Validators.required,
      ]);
      this.manageAccountForm.controls['offShoreRate'].setValidators([
        Validators.required,
      ]);
    }
  }
}