import { IgConfigurationService } from './../../../core/services/ig-configuration.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IgConfigurationDTO } from 'src/app/core/models/ig-configuration.model';
import { NgForm } from '@angular/forms';
import { SuccessPopupComponent } from '../../my-dashboard/success-popup/success-popup.component';

@Component({
  selector: 'app-ig-configuration-details',
  templateUrl: './ig-configuration-details.component.html',
  styleUrls: ['./ig-configuration-details.component.scss']
})
export class IgConfigurationDetailsComponent implements OnInit {
  @ViewChild('igConfigurationForm') igConfigurationForm: NgForm;
  igList: any[];
  igHeadList: any[];
  selectedIg: string;
  selectedIgHead: string;
  newIgName: string;
  newIgCode: string;
  selectedCode: string;


  constructor(
    public dialogRef: MatDialogRef<IgConfigurationDetailsComponent>,
    private IgConfigurationService: IgConfigurationService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.getAllDropdownData();
    if (this.isEdit()) {
      this.selectedIg = this.data.rowData.igId;
      this.selectedIgHead = this.data.rowData.igHeadId;
      this.newIgCode = this.data.rowData.igCode;
    }
  }

  getAllDropdownData() {
    this.getIgList();
    this.getIgHeadList();
  }

  getIgList() {
    this.igList = [];
    this.IgConfigurationService.getIgConfig().subscribe((data) => {
      this.igList = data;
    })
  }

  getIgHeadList() {
    this.igHeadList = [];
    this.IgConfigurationService.getIgHeadConfig().subscribe((data) => {
      this.igHeadList = data.filter((o) => o.roles.includes('IG'));
    })
  }

  isAdd() {
    return this.data.action === 'Add';
  }
  isEdit() {
    return this.data.action === 'Edit';
  }

  update() {
    let returnedTarget = {} as IgConfigurationDTO;
    const igObj = this.igList.find(
      (x) => x.igId === this.selectedIg
    );
    const igHeadObj = this.igHeadList.find(
      (x) => x.userId === this.selectedIgHead
    );
    if (igHeadObj) {
      igObj.igHead = igHeadObj.userName;
      igObj.igHeadId = igHeadObj.userId;
    }
    const igCode = { igCode: this.newIgCode };
    returnedTarget = Object.assign({}, igObj, igHeadObj, igCode);


    this.IgConfigurationService.updateIgConfiguration(returnedTarget).subscribe((data) => {
      this.dialog.open(SuccessPopupComponent, {
        width: '530px',
        data: { message: 'Data Updated Successfully !' }
      });
      this.close();
    })
  }
  validateIg(name: string) {
    if (name == 'newgName' && this.newIgName) {
      const filterIg = this.igList.filter((x) => x.igName === this.newIgName);
      if (filterIg.length > 0) {
        this.igConfigurationForm.controls[name].setErrors({ 'duplicateIg': true });
        return false;
      } else {
        this.igConfigurationForm.controls[name].setErrors(null);
      }
    }
    return true;
  }

  save() {
    const igName = { igName: this.newIgName };
    const igHeadFilter = this.igHeadList.find(
      (x) => x.userId === this.selectedIgHead
    )
    const igHead = { igHead: igHeadFilter ? igHeadFilter.userName : '' };
    const igHeadId = { igHeadId: igHeadFilter.userId };
    const igCode = { igCode: this.newIgCode };
    const returnedTarget = Object.assign(new IgConfigurationDTO(), { ...igName, ...igCode, ...igHeadId, ...igHead })
    this.IgConfigurationService.addIgConfiguration(returnedTarget).subscribe((data) => {
      this.dialog.open(SuccessPopupComponent, {
        width: '530px',
        data: { message: 'Data Updated Successfully !' }
      });
      this.close();
    })
  } close() {
    this.dialogRef.close();
  }

}
