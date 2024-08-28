import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShowCommentsComponent } from '../show-comments/show-comments.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RampUpDownService } from '../../../core/services/ramp-up-down.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RampUpValidationPopupComponent } from '../ramp-up-validation-popup/ramp-up-validation-popup.component';
import { SuccessPopupComponent } from '../../my-dashboard/success-popup/success-popup.component';
@Component({
  selector: 'app-fixed-monthly-account-edit',
  templateUrl: './fixed-monthly-account-edit.component.html',
  styleUrls: ['./fixed-monthly-account-edit.component.scss']
})
export class FixedMonthlyAccountEditComponent implements OnInit {
  accountName: any;
  location: any;
  comments: any;
  userComments: any = [];
  isDM: boolean = false;
  isBDM: boolean = false;
  isSalesHead: boolean = false;
  isCouncil: boolean = false;
  IsUserApproved: boolean = false;
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
  isSubmitted:boolean ;
  lastApproval:string = 'System';
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
    public dialogRef: MatDialogRef<FixedMonthlyAccountEditComponent>,
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
    this.accountName = this.data.element.Account;
    this.location = this.data.element.Location;
    this.getAccountWiseHeadCount(this.data);
  }

  getAccountWiseHeadCount(data: any) {
    this.service
      .getBillingDetailByAccountId(data.element.AccountId,data.element.ProjectId, data.element.Location)
      .subscribe((data) => {
        this.createCurrentHeadCount(data);
        this.CreateDMHeadCount(data);
     //   this.CreateSalesHeadCount(data);
    //    this.CreateCouncilHeadCount(data);
        this.CreateBDMHeadCount(data);
        this.CreateTotalRevenue(data);
        this.isLoaded = true;
      });
  }

  identifyLoginUser(dt) {
    this.isDM = dt[0].loggedInRole == 'DM' ? true : false;
    this.isBDM = dt[0].loggedInRole == 'BDM' ? true : false;
    this.isCouncil = dt[0].loggedInRole == 'Council' ? true : false;
    this.isSalesHead = dt[0].loggedInRole == 'SalesHead' ? true : false;
    this.IsUserApproved = dt[0].isApproved == undefined ? false : dt[0].isApproved;
    this.previousBilledAmount = dt[0].previousBilledAmount;
    this.previousHeadCount = dt[0].previousHeadCount;
  }
  createCurrentHeadCount(data: any) {
    this.currentHeadCount = [];
    var dt = data.filter((x) => x.createdBy.toLowerCase() == 'system');
    this.userComments = {
      comments: dt[0].workFlowdashboardComments,
      accountName: '',
    };
    this.identifyLoginUser(dt);
    var index = 0;
    dt[0].fPandFMBList.forEach((element) => {
      if (
        element.label != 'Account' &&
        element.label != 'AccountId' &&
        element.label != 'Location'
      ) {
        index = index + 1;
        this.currentHeadCount.push({
          id: index,
          name: element.label,
          count: parseInt(element.value),
          billingRate: element.billingRate,
          year: element.year,
          renevue : element.totalValue,
          headCount:0
        });
        this.labels.push(element.label);
      }
      if (element.label == 'Account') {
        this.userComments.accountName = element.value;
      }
    });
  }

  CreateDMHeadCount(data: any) {
    this.DM = [];
    var index = 0;
    var dt = data.filter((x) => x.createdBy == 'DM');
    if (dt.length != 1) {
      dt = data.filter((x) => x.createdBy.toLowerCase() == 'system');
    } else {
      if (dt[0].loggedInRole == 'DM') {
        this.IsUserApproved = dt[0].isApproved;
      }
      if(dt[0].isApproved){
        this.lastApproval = 'DM';
      }
    }

    dt[0].fPandFMBList.forEach((element) => {
      if (
        element.label != 'Account' &&
        element.label != 'AccountId' &&
        element.label != 'Location'
      ) {
        index = index + 1;
        this.DM.push({
          id: index,
          name: element.label,
          count: parseInt(element.value),
          billingRate: element.billingRate,
          year: element.year,
          renevue : element.totalValue,
          headCount:0
        });
      }
    });
  }

  CreateSalesHeadCount(data: any) {
    this.salesHead = [];
    var index = 0;
    var dt = data.filter((x) => x.createdBy == 'SalesHead');
    if (dt.length != 1) {
      dt = data.filter((x) => x.createdBy == 'System');
    } else {
      if (dt[0].loggedInRole == 'SalesHead') {
        this.IsUserApproved = dt[0].isApproved;
      }
    }

    dt[0].rampUpDownList.forEach((element) => {
      if (
        element.label != 'Account' &&
        element.label != 'AccountId' &&
        element.label != 'Location'
      ) {
        index = index + 1;
        this.salesHead.push({
          id: index,
          name: element.label,
          count: parseInt(element.value),
          billingRate: element.billingRate,
          year: element.year,
          renevue : element.totalValue,
          headCount:0
        });
      }
    });
  }

  CreateCouncilHeadCount(data: any) {
    this.council = [];
    var index = 0;
    var dt = data.filter((x) => x.createdBy == 'Council');
    if (dt.length != 1) {
      dt = data.filter((x) => x.createdBy == 'System');
    } else {
      if (dt[0].loggedInRole == 'Council') {
        this.IsUserApproved = dt[0].isApproved;
      }
    }

    dt[0].rampUpDownList.forEach((element) => {
      if (
        element.label != 'Account' &&
        element.label != 'AccountId' &&
        element.label != 'Location'
      ) {
        index = index + 1;
        this.council.push({
          id: index,
          name: element.label,
          count: parseInt(element.value),
          billingRate: element.billingRate,
          year: element.year,
          renevue : element.totalValue,
          headCount:0
        });
      }
    });
  }

  CreateBDMHeadCount(data: any) {
    this.BDM = [];
    var index = 0;
    var dt = data.filter((x) => x.createdBy == 'BDM');
    if (dt.length != 1) {
      dt = data.filter((x) => x.createdBy.toLowerCase() == 'system');
    } else {
      if (dt[0].loggedInRole == 'BDM') {
        this.IsUserApproved = dt[0].isApproved;
      }
      if(dt[0].isApproved){
        this.lastApproval = 'BDM';
      }
    }

    dt[0].fPandFMBList.forEach((element) => {
      if (
        element.label != 'Account' &&
        element.label != 'AccountId' &&
        element.label != 'Location'
      ) {
        index = index + 1;
        this.BDM.push({
          id: index,
          name: element.label,
          count: parseInt(element.value),
          billingRate: element.billingRate,
          year: element.year,
          renevue : element.totalValue,
          headCount:0
     
        });
      }
    });
  }

  CreateTotalRevenue(data: any) {
    this.TotalRenevue = [];
    var index = 0;
    var dt = [];
    if (this.isDM) {
      dt = data.filter((x) => x.createdBy == 'DM');
    } else if (this.isBDM) {
      dt = data.filter((x) => x.createdBy == 'BDM');
    } else if (this.isCouncil) {
      dt = data.filter((x) => x.createdBy == 'Council');
    } else if (this.isSalesHead) {
      dt = data.filter((x) => x.createdBy == 'SalesHead');
    }

    if (dt.length == 0) {
      dt = data.filter((x) => x.createdBy.toLowerCase() == 'system');
    }

    dt[0].fPandFMBList.forEach((element) => {
      if (
        element.label != 'Account' &&
        element.label != 'AccountId' &&
        element.label != 'Location'
      ) {
        index = index + 1;
        this.TotalRenevue.push({
          id: index,
          totalValue: element.totalValue,
        });
      }
    });
  }

  isDataUpdated(billingRate: number, count: number, index: any) {
    count = Number(count);
    this.dataUpdated = true;
    this.TotalRenevue[index - 1].totalValue =  count;
    this.updateRevenueObj(Math.round(this.TotalRenevue[index - 1].totalValue) , index -1 );
    
  }

  onTextChange(evt: any) {
    this.commantUpdate = true;
    if (!evt.target.value && !this.IsUserApproved) {
      this.commantUpdate = false;
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }
  
  public onUpdate(): void {
    if (this.commentInput.nativeElement.value && !this.isInputNotValid) {

      var dt = {
        comments: this.comments,
        accountId: this.data.element.AccountId,
        projectId: this.data.element.ProjectId,
        approvedBy: 'System',
        location: this.data.element.Location,
        detailsRevenue: this.BDM,
       // detailsRevenue:detailsRevenue,
        type:'FMB'
      };

      if (this.isDM) {
        dt.detailsRevenue = this.DM;
        dt.approvedBy = 'DM';
      } else if (this.isSalesHead) {
        dt.detailsRevenue = this.salesHead;
        
        dt.approvedBy = 'SalesHead';
      } else if (this.isBDM) {
        dt.detailsRevenue = this.BDM;
        dt.approvedBy = 'BDM';
      } else {
        dt.detailsRevenue = this.council;
        dt.approvedBy = 'System';
      }
      this.service.UpsertFMandFMBHeadCount(dt).subscribe((data) => {
        this.isSubmitted = true
        this.dialog.open(SuccessPopupComponent,{
          width: '530px',
          data: { message: 'Data Updated Successfully !' }
        }); 
        this.dialogRef.close();
        this.isSubmitted = false
      });

    } else {
      this.openFailedPopup();
    }
  }

  updateRevenueObj(rate, index) {
    if (this.isDM) { 
      this.DM[index].renevue = rate;
    } else if (this.isSalesHead) {
      this.isSalesHead[index].renevue = rate;
    } else if (this.isBDM) {
      this.BDM[index].renevue = rate;
    } else {
      this.council[index].renevue = rate;
      
    }

  }
  checkDirty(value) {
    this.isInputNotValid = true;
    if (value.dirty) {
      if (value.valid) {
        this.isInputNotValid = false;
      } else {
        this.isInputNotValid = true;
      }
    }
  }
  onShowComments() {
    this.dialog.open(ShowCommentsComponent, {
      width: '850px',
      minHeight: '300px',
      data: this.userComments,
    });
  }
  openFailedPopup() {
    let amountType : string = 'BDM'
    if(this.isDM){
      amountType='DM'
    }
 
    this.dialog.open(RampUpValidationPopupComponent, {
      data:{message:`Please Enter ${amountType} Amounts & Comments`}
    });
  }
}

