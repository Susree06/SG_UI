import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ValidationPopupComponent } from '../../my-dashboard/validation-popup/validation-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { AccessManagementService } from 'src/app/core/services/access-management.service';
import { EmployeeRoleAssociationPopupComponent } from '../employee-role-association-popup/employee-role-association-popup.component';
import { MatOptionSelectionChange } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserConfigService } from 'src/app/core/services/user-config.service';
import { SuccessPopupComponent } from '../../my-dashboard/success-popup/success-popup.component';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-employee-role-association',
  templateUrl: './employee-role-association.component.html',
  styleUrls: ['./employee-role-association.component.scss'],
})
export class EmployeeRoleAssociationComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  employeeAddForm!: FormGroup;
  displayedColumns: string[] = ['UserName', 'Role', 'Action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  RoleList: any;
  UserList: any;
  modifiedUserList: any = [];
  searchCtrlRole = new FormControl('');
  searchCtrlUserName = new FormControl('');
  hasEditAccess: boolean = false;
  hasViewAccess: boolean = false;
  roleChangeSubscription!: Subscription;
  newUserName: any;
  filteredRoleOptions!: Observable<any[]> | undefined;
  filteredUserNameOptions!: Observable<any[]> | undefined;
  isSaveDisabled: boolean = false;
  hasFormChanges: boolean = false;
  originalValues: any;
  employeeAsscList: any;
  currentFilter: any = '';
  selectedUserId: any;
  selectedUser: any;
  @ViewChild(CdkVirtualScrollViewport, { static: true })
  cdkVirtualScrollViewPort: CdkVirtualScrollViewport;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(
    public dialog: MatDialog,
    private _employeeRoleAssociationService: AccessManagementService,
    private _fb: FormBuilder,
    private _userConfigService: UserConfigService  ) {
    this.employeeAddForm = this._fb.group({
      roleId: { value: '' },
      userId: { value: '' },
      userName: ['', [Validators.required]],
      roleIds: [[], [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getEmployeeRoleDetails();
    this.getRoleList();
  }
  ngOnDestroy() {
    if (this.roleChangeSubscription) {
      this.roleChangeSubscription.unsubscribe();
    }
  }
  private roleFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.RoleList.filter((option: { roleName: string }) =>
      option.roleName.toLowerCase().includes(filterValue)
    );
  }

  private userNameFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.UserList.filter((option: { userName: string }) =>
      option.userName.toLowerCase().includes(filterValue)
    );
  }

  getAllUsers() {
    try {
      this._userConfigService.getAllUsers().subscribe({
        next: (res) => {
          this.modifiedUserList = res.filter(
            (obj1) =>
              !this.employeeAsscList.some((obj2) => obj2.userId === obj1.userId)
          );

          this.UserList = this.modifiedUserList;
          this.filteredUserNameOptions =
            this.searchCtrlUserName.valueChanges.pipe(
              startWith(''),
              map((value) => {
                const name = typeof value === 'string' ? value : '';
                let filteredList = name
                  ? this.userNameFilter(name as string)
                  : this.UserList.slice();
                if (this.selectedUser) {
                  filteredList = filteredList.filter(
                    (user) => user.userId !== this.selectedUser.userId
                  );
                  filteredList.unshift(this.selectedUser);
                }
                return filteredList;
              })
            );
          this.employeeAddForm.valueChanges.subscribe(() => {
            this.hasFormChanges = !this.isFormUnchanged();
          });
        },
        error: (error: any) => {
          this.openValidationPopup(error.errorMessage, error.title);
        },
      });
    } catch (err) {
      this.openValidationPopup(err, 'Error in getting Role Details !');
    }
  }
  trackByFn(index: number, item: any): any {
    return item.userId;
  }
  onUserSelectionChange(value: any) {
    this.selectedUser = this.UserList.find((user) => user.userId === value);
  }
  isFormUnchanged(): boolean {
    return (
      JSON.stringify(this.employeeAddForm.value) ===
      JSON.stringify(this.originalValues)
    );
  }
  getEmployeeRoleDetails() {
    try {
      const serviceEndpoint = 'controller/GetRolesUserAssociation';
      this._employeeRoleAssociationService
        .getEmployeeRoleDetails(serviceEndpoint)
        .subscribe({
          next: (res) => {
            this.dataSource = new MatTableDataSource<any>(res);
            this.dataSource.paginator = this.paginator;
            this.employeeAsscList = res;
            this.applyFilter(
              { target: { value: this.currentFilter } } as any,
              'save'
            );
            this.getAllUsers();
          },
          error: (error: any) => {
            this.openValidationPopup(error.errorMessage, error.title);
          },
        });
    } catch (err) {
      this.openValidationPopup(err, 'Error in getting Role Details !');
    }
  }

  getRoleList() {
    try {
      const serviceEndpoint = 'Role/GetRoles';
      this._employeeRoleAssociationService
        .getEmployeeRoleDetails(serviceEndpoint)
        .subscribe({
          next: (res) => {
            this.RoleList = res;
            if (this.employeeAddForm.value.roleIds === undefined) {
              this.employeeAddForm.get('roleIds')?.setValue([]);
            }
            this.filteredRoleOptions = this.searchCtrlRole.valueChanges.pipe(
              startWith(''),
              map((value) => {
                const name = typeof value === 'string' ? value : '';
                return name
                  ? this.roleFilter(name as string)
                  : this.RoleList.slice();
              })
            );
            this.employeeAddForm.valueChanges.subscribe(() => {
              this.hasFormChanges = !this.isFormUnchanged();
            });
          },
          error: (error: any) => {
            this.openValidationPopup(error.errorMessage, error.title);
          },
        });
    } catch (err) {
      this.openValidationPopup(err, 'Error in getting Role Details !');
    }
  }

  onSelectionChange(a: MatOptionSelectionChange) {
    let values: string[] =
      this.employeeAddForm?.value.roleIds || ([] as string[]);
    if (a.isUserInput) {
      if (a.source.selected && !values.includes(a.source.value)) {
        values.push(a.source.value);
      } else if (!a.source.selected && values.includes(a.source.value)) {
        values = values.filter((value) => value !== a.source.value);
      }
      this.employeeAddForm.get('roleIds')?.setValue(values);
    }
  }

  isEditMode: boolean = true;
  openEditDialog(element: any): void {
    try {
      const dialogRef = this.dialog.open(
        EmployeeRoleAssociationPopupComponent,
        {
          width: '800px',
          height: '280px',
          data: {
            element,
            isEditMode: true,
            RoleList: this.RoleList,
            title: 'Edit Role Details',
          },
        }
      );
      this.currentFilter = this.dataSource.filter;
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getEmployeeRoleDetails();
          }
        },
      });
    } catch (err) {
      this.openValidationPopup(err, 'Error in Opening Role Dialogue Box !');
    }
  }

  openAdutitDialog(element: any): void {
    try {
      // const dialogRef = this.dialog.open(AuditTableComponent, {
      //   width: '1060px',
      //   maxWidth: '120vm',
      //   disableClose: true,
      //   data: {element:element,isEditMode:false,title:"Employee Role"}
      // });
      // dialogRef.afterClosed().subscribe({
      //   next: (val) => {
      //     if (val) {
      //       this.getRoleDetails();
      //     }
      //   },
      // });
    } catch (err) {
      this.openValidationPopup(
        err,
        'Error in Opening Role Audit Dialogue Box !'
      );
    }
  }
  foropen() {
    this.cdkVirtualScrollViewPort.scrollToIndex(5);
  }

  openChange($event: boolean) {
    this.foropen();
    this.cdkVirtualScrollViewPort.scrollToIndex(0);
    this.cdkVirtualScrollViewPort.checkViewportSize();
    this.searchCtrlUserName.setValue('');
  }

  applyFilter(event: Event, type: string) {
    let filterValue = '';
    if (type === 'init') {
      filterValue = (event.target as HTMLInputElement).value;
    } else {
      filterValue = this.currentFilter;
    }
    this.dataSource.filterPredicate = (data, filter: string) => {
      if (data && data.userName && data.roleNames) {
        const searchTerms = filter.split(' ');
        return searchTerms.every(
          (term) =>
            data.userName.toLowerCase().includes(term) ||
            data.roleNames.toLowerCase().includes(term)
        );
      } else {
        return false;
      }
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addNewUser(formDirective) {
    if (this.employeeAddForm.valid) {
      const newRoleObj = {
        roleId: 0,
        roles: this.employeeAddForm.value.roleIds,
        userId: this.employeeAddForm.value.userName,
        userName: '',
      };
      const serviceEndpoint = 'controller/AddRolesUserAssociation';
      this._employeeRoleAssociationService
        .AddNewUser(serviceEndpoint, newRoleObj)
        .subscribe({
          next: (data: any) => {
            this.dialog.open(SuccessPopupComponent, {
              width: '530px',
              data: { message: 'User Added Successfully !' },
            });
            formDirective.resetForm();
            this.employeeAddForm.reset();
            this.selectedUser = '';
            this.getEmployeeRoleDetails();
          },
          error: (error: any) => {
            this.dialog.open(ValidationPopupComponent, {
              width: '530px',
              data: { message: error.errorMessage, title: error.title },
            });
            // this.newRoleName = '';
          },
        });
    }
  }

  private openValidationPopup(error: any, title: any) {
    this.dialog.open(ValidationPopupComponent, {
      width: '530px',
      data: { message: error, title: title },
    });
  }
}