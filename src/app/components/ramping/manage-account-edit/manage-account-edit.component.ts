import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShowCommentsComponent } from '../show-comments/show-comments.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RampUpDownService } from '../../../core/services/ramp-up-down.service';
import { FormArray, FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { RampUpValidationPopupComponent } from '../ramp-up-validation-popup/ramp-up-validation-popup.component';
import { retry } from 'rxjs';
import { SuccessPopupComponent } from '../../my-dashboard/success-popup/success-popup.component';

@Component({
  selector: 'app-manage-account-edit',
  templateUrl: './manage-account-edit.component.html',
  styleUrls: ['./manage-account-edit.component.scss'],
})
export class ManageAccountEditComponent {
  accountName: any;
  location: any;
  comments: any;
  userComments: any = [];
  isDM: boolean = false;
  isBDM: boolean = false;
  isSalesHead: boolean = false;
  isCouncil: boolean = false;
  IsUserApproved: boolean = false;
  isAdmin: boolean = false;
  salesHead: any = [];
  council: any = [];
  DM: any = [];
  BDM: any = [];
  TotalRenevue: any = [];
  currentHeadCount: any = [];
  labels: any = [];
  dataUpdated = false;
  commantUpdate = false;
  userTable: FormGroup;
  control: FormArray;
  isLoaded: boolean = false;
  rampupdownForm: FormGroup;
  isSubmitted: boolean;
  lastApproval: string = 'System';
  offShoreData: any = [];
  onSiteData: any = [];
  showOffshoreTab: boolean = false;
  showOnSiteTab: boolean = false;
  res: any = [];
  // @ViewChild('commentInput', { static: false })
  // public councilInput!: ElementRef;
  // @ViewChild('councilInput') councilInput: ElementRef<HTMLInputElement>;
  // @ViewChild('councilInput') councilInput: ElementRef;
  // @ViewChild('councilInput', { static: true }) councilInput: NgModel; //WORKED
  @ViewChild('commentInput', { read: ElementRef })
  commentInput: ElementRef<HTMLInputElement>;
  @ViewChild('councilInput', { read: ElementRef })
  councilInput: ElementRef<HTMLInputElement>;

  previousHeadCount = 0;
  previousBilledAmount = 0;

  isInputNotValid: boolean;
  constructor(
    public dialogRef: MatDialogRef<ManageAccountEditComponent>,
    private router: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: RampUpDownService,
    private fb: FormBuilder
  ) {
    dialogRef.disableClose = true;
  }
  ngOnInit() {
    // will log the entire data object
    this.accountName = this.data.account;
    this.location = this.data.location;
    this.getAccountWiseHeadCount(this.data);
  }

  getAccountWiseHeadCount(data: any) {
    this.service
      .getAccountWiseHeadCountbyId(
        data.accountId,
        data.projectId,
        data.location
      )
      .subscribe((data) => {
        this.res = data;
        this.offShoreData = this.res?.Offshore || [];
        this.onSiteData = this.res?.Onsite || [];
        this.showOffshoreTab = this.offShoreData.length > 0 ? true : false;
        this.showOnSiteTab = this.onSiteData.length > 0 ? true : false;
        this.isLoaded = true;
      });
  }
  public onClose(): void {
    this.dialogRef.close();
  }
  openFailedPopup() {
    this.dialog.open(RampUpValidationPopupComponent, {
      data: { message: 'Please Enter HeadCount & Comments' },
    });
  }
}
