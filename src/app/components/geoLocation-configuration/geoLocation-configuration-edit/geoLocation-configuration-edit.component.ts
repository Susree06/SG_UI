import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { GeoLocationConfigurationComponent } from '../geoLocation-configuration.component';
import { GeoLocationConfigurationService } from 'src/app/core/services/geoLocation-configuration.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeoLocationDto } from 'src/app/core/models/geoLocation-configuration.model';
import { NgForm } from '@angular/forms';
import { SuccessPopupComponent } from '../../my-dashboard/success-popup/success-popup.component';

@Component({
  selector: 'app-geoLocation-configuration-edit',
  templateUrl: './geoLocation-configuration-edit.component.html',
  styleUrls: ['./geoLocation-configuration-edit.component.scss']
})
export class GeoLocationConfigurationEditComponent implements OnInit {
  @ViewChild('geoLocationForm') geoLocationForm: NgForm;
  geoLocationList: any[];
  newGeoLocationName: string;
  newGeoLocationCode: string;

  constructor(
    public dialogRef: MatDialogRef<GeoLocationConfigurationComponent>,
    private GeoLocationConfigurationService: GeoLocationConfigurationService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    if (this.isEdit()) {
      this.newGeoLocationName = this.data.rowData.locationName;
      this.newGeoLocationCode = this.data.rowData.locationCode;
    }
    this.getGeoLocationList();
  }
  isEdit() {
    return this.data.action === 'Edit';
  }
  isAdd() {
    return this.data.action === 'Add';
  }
  getGeoLocationList(){
    this.geoLocationList=[];
    this.GeoLocationConfigurationService.getGeoLocationConfig().subscribe((data)=>{
      this.geoLocationList=data;
    })

  }
  validateGeoLocation(name){
    if (name == 'geoLocationName' && this.newGeoLocationName){
      const filterLocation = this.geoLocationList.filter((x) => x.locationName === this.newGeoLocationName);
      if (filterLocation.length > 0) {
        this.geoLocationForm.controls[name].setErrors({ 'duplicateGeoLocation': true });
        return false;
      } else {
        this.geoLocationForm.controls[name].setErrors(null);
      }
    }
    return true;

  }
  save() {
    const obj = {
      geoLocationId: 0,
      locationName: this.newGeoLocationName,
      locationCode: this.newGeoLocationCode,
    } as unknown as GeoLocationDto;
    this.GeoLocationConfigurationService.addGeoLocationConfiguration(obj).subscribe((data) => {
      this.dialog.open(SuccessPopupComponent,{
        width: '530px',
        data: { message: 'Data Updated Successfully !' }
      });
      this.close();
    })
  }
  update(){
    const obj = {
      geoLocationId: this.data.rowData.geoLocationId,
      locationName: this.newGeoLocationName,
      locationCode: this.newGeoLocationCode,
    } as unknown as GeoLocationDto;
    this.GeoLocationConfigurationService.updateIgConfiguration(obj).subscribe((data)=>{
      this.dialog.open(SuccessPopupComponent,{
        width: '530px',
        data: { message: 'Data Updated Successfully !' }
      });
      this.close();
    })
  }
  close() {
    this.dialogRef.close();
  }

}
