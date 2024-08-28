import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { MatOptionSelectionChange } from '@angular/material/core';
import { EmployeeRoleAssociationComponent } from '../employee-role-association/employee-role-association.component';
import { AccessManagementService } from 'src/app/core/services/access-management.service';
import { PeriodicElement } from '../role-access-management/role-access-management.component';
import { ConfirmPopupComponent } from '../../my-dashboard/confirm-popup/confirm-popup.component';
import { SuccessPopupComponent } from '../../my-dashboard/success-popup/success-popup.component';
import { ValidationPopupComponent } from '../../my-dashboard/validation-popup/validation-popup.component';

@Component({
  selector: 'app-employee-role-association-popup',
  templateUrl: './employee-role-association-popup.component.html',
  styleUrls: ['./employee-role-association-popup.component.scss'],
})
export class EmployeeRoleAssociationPopupComponent implements OnInit {
  employeeRoleForm!: FormGroup;
  isEditMode!: boolean;
  element!: PeriodicElement;
  title: string;
  originalValues: any;
  filteredRoleOptions!: Observable<any[]> | undefined;
  isSaveDisabled: boolean = false;
  searchCtrlRole = new FormControl('');
  roleList: any;
  visaTypeList: any;
  modifiedrole: any;
  hasFormChanges: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _employeeRoleAssociationService: AccessManagementService,
    private dialogRef: MatDialogRef<EmployeeRoleAssociationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog
  ) {
    this.isEditMode = data.isEditMode;
    this.title = data.title;
    this.roleList = data.RoleList;
    this.employeeRoleForm = this._fb.group({
      roleId: [0],
      roles: [{ value: '' }],
      userId: { value: '' },
      userName: { value: '', disabled: true },
    });
  }

  ngOnInit(): void {
    this.originalValues = { ...this.data.element };
    this.modifiedrole = this.data.element.roleIds
      .toString()
      .split(',')
      .map(Number);
    this.employeeRoleForm.patchValue(this.data.element);
    this.employeeRoleForm.get('roles')?.setValue(this.modifiedrole);

    if (this.employeeRoleForm.value.roles === 0) {
      this.employeeRoleForm.get('roles')?.setValue('');
    }
    this.filteredRoleOptions = this.searchCtrlRole.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : '';
        return name ? this.roleFilter(name as string) : this.roleList.slice();
      })
    );
    this.employeeRoleForm.valueChanges.subscribe(() => {
      this.hasFormChanges = !this.isFormUnchanged();
    });
  }
  isFormUnchanged(): boolean {
    return (
      JSON.stringify(this.employeeRoleForm.value) ===
      JSON.stringify(this.originalValues)
    );
  }
  private roleFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.roleList.filter((option: { roleName: string }) =>
      option.roleName.toLowerCase().includes(filterValue)
    );
  }

  onSelectionChange(a: MatOptionSelectionChange) {
    let values: string[] =
      this.employeeRoleForm?.value.roles || ([] as string[]);
    if (a.isUserInput) {
      if (a.source.selected && !values.includes(a.source.value)) {
        values.push(a.source.value);
      } else if (!a.source.selected && values.includes(a.source.value)) {
        values = values.filter((value) => value !== a.source.value);
      }
      this.employeeRoleForm.get('roles')?.setValue(values);
    }
    this.originalValues = { ...this.data.element };
  }

  save() {
    if (this.employeeRoleForm.valid) {
      const serviceEndpoint = 'controller/UpdateRolesUserAssociation';
      const employeeRoleForm = this.employeeRoleForm.getRawValue();
      this._employeeRoleAssociationService
        .UpdateDetails(serviceEndpoint, employeeRoleForm)
        .subscribe({
          next: (data: any) => {
            this.dialog.open(SuccessPopupComponent, {
              width: '530px',
              data: { message: 'Data Updated Successfully !' },
            });
            this._employeeRoleAssociationService.updateEmployeeRoleDetails();
            this.dialogRef.close(true);
          },
          error: (error: any) => {
            this.dialog.open(ValidationPopupComponent, {
              width: '530px',
              data: { message: error.errorMessage, title: error.title },
            });
          },
        });
    }
  }
}
