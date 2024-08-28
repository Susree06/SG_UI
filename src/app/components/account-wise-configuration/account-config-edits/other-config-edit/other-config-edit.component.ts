import { Component, Inject, OnInit } from '@angular/core';
import { SuccessPopupComponent } from 'src/app/components/my-dashboard/success-popup/success-popup.component';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { OtherConfigDto } from 'src/app/core/models/account-wise-configuration.model';
import { OtherConfigService } from 'src/app/core/services/other-config.service';

@Component({
  selector: 'app-other-config-edit',
  templateUrl: './other-config-edit.component.html',
  styleUrls: ['./other-config-edit.component.scss'],
})
export class OtherConfigEditComponent implements OnInit {
  accountList: any[] = [];
  igList: any[];
  geoLocationList: any[];
  selectedAccount: string;
  selectedIg: string;
  selectedGeoLocation: string;

  constructor(
    public dialogRef: MatDialogRef<OtherConfigEditComponent>,
    private otherConfigService: OtherConfigService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.getAllDropdownData();
    this.setRowData();
  }

  createAccountList() {
    this.accountList = [];
    this.otherConfigService.getAllAccounts().subscribe((data) => {
      this.accountList = data;
    });
  }
  createIgList() {
    this.igList = [];
    this.otherConfigService.getIgConfig().subscribe((data) => {
      this.igList = data;
    });
  }
  createGeoLocationList() {
    this.geoLocationList = [];
    this.otherConfigService.getGeoLocationConfig().subscribe((data) => {
      this.geoLocationList = data;
    });
  }
  getAllDropdownData() {
    this.createAccountList();
    this.createIgList();
    this.createGeoLocationList();
  }
  save() {
    let params: OtherConfigDto = {
      accountId: 0,
      accountName: '',
      igId: 0,
      ig: '',
      geoLocation: '',
      geoLocationId: 0
    };
    const account = this.accountList.find(
      (x) => x.accountId === this.selectedAccount
    );
    const ig = this.igList.find(
      (x) => x.igId === this.selectedIg
    );
    const geoLocation = this.geoLocationList.find(
      (x) => x.geoLocationId === this.selectedGeoLocation
    );
    const returnedTarget = Object.assign({}, account, ig, geoLocation);
    let { accountId, customerName, igId, igName, geoLocationId, locationName } =
      returnedTarget;
    params.accountId = accountId;
    params.accountName = customerName;
    params.geoLocation = locationName;
    params.geoLocationId = geoLocationId;
    params.ig = igName;
    params.igId = igId;
    this.otherConfigService.updateOtherConfig(params).subscribe((data) => {
      console.log(data);
    });
    this.dialog.open(SuccessPopupComponent,{
      width: '530px',
      data: { message: 'Data Updated Successfully !' }
    });
    this.close();
  }
  close() {
    this.dialogRef.close();
  }

  isEdit(){
    return this.data.action === 'Edit';
  }

  setRowData(){
    if (this.isEdit() && this.data.rowData){
      this.selectedAccount=this.data.rowData.accountId;
      this.selectedIg=this.data.rowData.igId;
      this.selectedGeoLocation=this.data.rowData.geoLocationId;
    }
  }

}
