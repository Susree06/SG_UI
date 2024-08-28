import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmPopupComponent } from '../../my-dashboard/confirm-popup/confirm-popup.component';
import { SuccessPopupComponent } from '../../my-dashboard/success-popup/success-popup.component';
import { ValidationPopupComponent } from '../../my-dashboard/validation-popup/validation-popup.component';
import { AccessManagementService } from 'src/app/core/services/access-management.service';

@Component({
  selector: 'app-role-access-management-popup',
  templateUrl: './role-access-management-popup.component.html',
  styleUrls: ['./role-access-management-popup.component.scss']
})
export class RoleAccessManagementPopupComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['demo-name', 'modify', ];
  dataSource = new MatTableDataSource<any>;//(ELEMENT_DATA);
  canModifyHeader !: boolean
  canViewHeader !: boolean
  canAddHeader !: boolean
  canDeleteHeader !: boolean
  element!: PeriodicElement;
  //title: string;
  sort: any;
  paginator: any;

  constructor(public dialogRef: MatDialogRef<SuccessPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog, private _rollDetailsService: AccessManagementService) { 
      this.element = data.element.roleName;
      this.dataSource = new MatTableDataSource();
    }
  
    ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.getRoleFeaturelistDetails();    
  }
  getRoleFeaturelistDetails(){
    try {
      const serviceEndpoint = 'RoleFeaturesAssoc/GetRoleFeaturesAssociation'
      this._rollDetailsService.GetFeatureDetailsByRole(serviceEndpoint,this.element).subscribe({
        next: (res) => {
          this.dataSource.data = res;
          this.toggleModifyHeader();
        },
        error: (error: any) => {
          this.openValidationPopup(error.errorMessage, error.title);
        }
      });
    }
    catch (err) {
      this.openValidationPopup(err, 'Error in getting Skill Details !');
    }
  }
  modifyHeader(e: any) {
    if (e.target.checked === true) {
      this.dataSource.data.forEach((element) => {
        element.hasPermission = true;
      })
      this.canModifyHeader = true;
    }
    else {
      this.dataSource.data.forEach((element) => {
        element.hasPermission = false;
      })
      this.canModifyHeader = false;
    }
  }
  modifyRow(e: any, element: any) {
    this.toggleModifyHeader()
  }
  toggleModifyHeader() {  
    let headerToggle: any = this.dataSource.data.filter(eachRow =>
      eachRow.hasPermission === false)
    if (headerToggle.length > 0) {
      this.canModifyHeader = false;
    }
    else {
      this.canModifyHeader = true;
    }
  }
  save() {
        const serviceEndpoint = "RoleFeaturesAssoc/UpdateRolesFeatureAssociation";
        this._rollDetailsService.UpdateDetails(serviceEndpoint, this.dataSource.data).subscribe({
          next: (data: any) => {
              this.dialog.open(SuccessPopupComponent, {
                width: '530px',
                data: { message: 'Data Updated Successfully !' }
              });
              this._rollDetailsService.updateEmployeeRoleDetails();
              this.dialogRef.close(true);
          },
          error: (error: any) => {
            this.dialog.open(ValidationPopupComponent, {
              width: '530px',
              data: { message: error.errorMessage, title: error.title }
            });
          }
       });
  }
  private openValidationPopup(error: any, title: any) {
    this.dialog.open(ValidationPopupComponent, {
      width: '530px',
      data: { message: error, title: title }
    });
  }
}

export interface PeriodicElement {
  featureName: string;
  featureId: string,
  position: number;
  hasPermission: boolean;
  canView: boolean;
  action: string;
  accessOptions: string[];
  selectedModifyAccess: string;
  selectedViewAccess: string;
  selectedDeleteAccess: string;
  selectedAddAccess: string;
  modifiedBy: string;
  createdBy: string;
  createdDate: Date;
  modifiedDate: Date;
  isEditing: boolean;
}
