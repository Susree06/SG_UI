import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RampUpDownService } from 'src/app/core/services/ramp-up-down.service';
import { SuccessPopupComponent } from '../../my-dashboard/success-popup/success-popup.component';
import { RampUpValidationPopupComponent } from '../ramp-up-validation-popup/ramp-up-validation-popup.component';
import { ShowCommentsComponent } from '../show-comments/show-comments.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ManageAccountEditComponent } from '../manage-account-edit/manage-account-edit.component';

@Component({
  selector: 'app-manage-account-offshore-onsite',
  templateUrl: './manage-account-offshore-onsite.component.html',
  styleUrls: ['./manage-account-offshore-onsite.component.scss'],
})
export class ManageAccountOffshoreOnsiteComponent implements OnInit {
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
  @ViewChild('commentInput', { read: ElementRef })
  commentInput: ElementRef<HTMLInputElement>;
  // @ViewChild('councilInput', { read: ElementRef })[]
  councilInput: ElementRef<HTMLInputElement>;
  previousHeadCount = 0;
  previousBilledAmount = 0;
  isInputNotValid: boolean;
  @Input() tabData: any;
  @Input() data: any;
  @Input() dataLocation:string;

  constructor(
    private service: RampUpDownService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ManageAccountEditComponent>
  ) {}
  ngOnInit(): void {
    this.createCurrentHeadCount(this.tabData);
    this.CreateDMHeadCount(this.tabData);
    this.CreateSalesHeadCount(this.tabData);
    this.CreateCouncilHeadCount(this.tabData);
    this.CreateBDMHeadCount(this.tabData);
    this.CreateTotalRevenue(this.tabData);
    this.isLoaded = true;
  }

  identifyLoginUser(dt) {
    this.isDM = dt[0].loggedInRole == 'DM' ? true : false;
    this.isBDM = dt[0].loggedInRole == 'BDM' ? true : false;
    this.isCouncil = dt[0].loggedInRole == 'Council' ? true : false;
    this.isSalesHead = dt[0].loggedInRole == 'SalesHead' ? true : false;
    this.IsUserApproved = dt[0].isApproved;
    this.previousBilledAmount = dt[0].previousBilledAmount;
    this.previousHeadCount = dt[0].previousHeadCount;
  }

  createCurrentHeadCount(data: any) {
    this.currentHeadCount = [];
    var dt = data.filter((x) => x.createdBy == 'System');
    this.userComments = {
      comments: dt[0].workFlowdashboardComments,
      accountName: '',
    };
    this.identifyLoginUser(dt);
    var index = 0;
    dt[0].rampUpDownList.forEach((element) => {
      if (
        element.label != 'Account' &&
        element.label != 'AccountId' &&
        element.label != 'Location'
      ) {
        index = index + 1;
        this.currentHeadCount.push({
          id: index,
          name: element.label,
          count: element.value,
          billingRate: element.billingRate,
          year: element.year,
          totalRenevue: element.totalValue,
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
      dt = data.filter((x) => x.createdBy == 'System');
    } else {
      if (dt[0].loggedInRole == 'DM') {
        this.IsUserApproved = dt[0].isApproved;
      }
      if (dt[0].isApproved) this.lastApproval = 'DM';
    }

    dt[0].rampUpDownList.forEach((element) => {
      if (
        element.label != 'Account' &&
        element.label != 'AccountId' &&
        element.label != 'Location'
      ) {
        index = index + 1;
        this.DM.push({
          id: index,
          name: element.label,
          count: element.value,
          billingRate: element.billingRate,
          year: element.year,
          totalRenevue: element.totalValue,
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
          count: element.value,
          billingRate: element.billingRate,
          year: element.year,
          totalRenevue: element.totalValue,
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
          count: element.value,
          billingRate: element.billingRate,
          year: element.year,
          totalRenevue: element.totalValue,
        });
      }
    });
  }

  CreateBDMHeadCount(data: any) {
    this.BDM = [];
    var index = 0;
    var dt = data.filter((x) => x.createdBy == 'BDM');
    if (dt.length != 1) {
      dt = data.filter((x) => x.createdBy == 'System');
    } else {
      if (dt[0].loggedInRole == 'BDM') {
        this.IsUserApproved = dt[0].isApproved;
      }
      if (dt[0].isApproved) this.lastApproval = 'BDM';
    }

    dt[0].rampUpDownList.forEach((element) => {
      if (
        element.label != 'Account' &&
        element.label != 'AccountId' &&
        element.label != 'Location'
      ) {
        index = index + 1;
        this.BDM.push({
          id: index,
          name: element.label,
          count: element.value,
          billingRate: element.billingRate,
          year: element.year,
          totalRenevue: element.totalValue,
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
      dt = data.filter((x) => x.createdBy == 'System');
    }

    dt[0].rampUpDownList.forEach((element) => {
      if (
        element.label != 'Account' &&
        element.label != 'AccountId' &&
        element.label != 'Location'
      ) {
        index = index + 1;
        this.TotalRenevue.push({
          id: index,
          totalValue: element.totalValue,
          adjustmentAmount: element.adjustmentAmount,
        });
      }
    });
  }

  isDataUpdated(
    billingRate: number,
    count: number,
    index: any,
    revenueAdustment: number
  ) {
    count = Number(count);
    billingRate = Number(billingRate);
    revenueAdustment = Number(revenueAdustment);
    this.dataUpdated = true;
    if (
      this.previousBilledAmount == 0 ||
      count == 0 ||
      this.previousHeadCount <= 0
    ) {
      let total = Math.round(billingRate * count) + revenueAdustment;
      this.TotalRenevue[index - 1].totalValue = total < 0 ? 0 : total;
    } else if (this.previousHeadCount < count) {
      let total =
        Math.round(
          this.previousBilledAmount +
            (count - this.previousHeadCount) * billingRate
        ) + revenueAdustment;
      this.TotalRenevue[index - 1].totalValue = total < 0 ? 0 : total;
    } else {
      let total =
        Math.round(
          this.previousBilledAmount -
            (this.previousHeadCount - count) * billingRate
        ) + revenueAdustment;
      this.TotalRenevue[index - 1].totalValue = total < 0 ? 0 : total;
    }
    this.updateRevenueObj(
      Math.round(this.TotalRenevue[index - 1].totalValue),
      index - 1
    );
  }

  onTextChange(evt: any) {
    this.commantUpdate = true;

    if (!evt.target.value && !this.IsUserApproved) {
      this.commantUpdate = false;
    }
  }

  public onUpdate(): void {
    if (this.commentInput.nativeElement.value && !this.isInputNotValid) {
      var dt = {
        comments: this.comments,
        accountId: this.data.accountId,
        projectId: this.data.projectId,
        approvedBy: 'System',
        location: this.dataLocation,
        ramps: this.BDM,
      };

      if (this.isDM) {
        dt.ramps = this.DM;
        dt.approvedBy = 'DM';
      } else if (this.isSalesHead) {
        dt.ramps = this.salesHead;

        dt.approvedBy = 'SalesHead';
      } else if (this.isBDM) {
        dt.ramps = this.BDM;
        dt.approvedBy = 'BDM';
      } else {
        dt.ramps = this.council;
        dt.approvedBy = 'Council';
      }
      dt.ramps.forEach((element) => {
        element.adjustmentAmount =
          this.TotalRenevue[element.id - 1].adjustmentAmount;
      });

      this.service.UpsertHeadCount(dt).subscribe((data) => {
        this.isSubmitted = true;
        this.dialog.open(SuccessPopupComponent, {
          width: '530px',
          data: { message:`${this.dataLocation} data has been updated successfully!` },
        });
       // this.dialogRef.close();
        this.isSubmitted = false;
      });
    } else {
      this.openFailedPopup();
    }
  }

  updateRevenueObj(rate, index) {
    if (this.isDM) {
      this.DM[index].totalRenevue = rate;
    } else if (this.isSalesHead) {
      this.isSalesHead[index].totalRenevue = rate;
    } else if (this.isBDM) {
      this.BDM[index].totalRenevue = rate;
    } else {
      this.council[index].totalRenevue = rate;
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
    this.dialog.open(RampUpValidationPopupComponent, {
      data: { message: 'Please Enter HeadCount & Comments' },
    });
  }
}