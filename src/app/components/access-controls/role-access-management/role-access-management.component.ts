import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AccessManagementService } from 'src/app/core/services/access-management.service';
import { SuccessPopupComponent } from '../../my-dashboard/success-popup/success-popup.component';
import { ValidationPopupComponent } from '../../my-dashboard/validation-popup/validation-popup.component';
import { RoleAccessManagementPopupComponent } from '../role-access-management-popup/role-access-management-popup.component';

@Component({
  selector: 'app-role-access-management',
  templateUrl: './role-access-management.component.html',
  styleUrls: ['./role-access-management.component.scss'],
})
export class RoleAccessManagementComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  displayedColumns: string[] = ['roleName', 'Action'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  checksView = false;
  isEditMode: boolean = true;
  hasEditAccess: boolean = false;
  roleChangeSubscription!: Subscription;
  newRoleName: any;
  currentFilter: any = '';
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private _roleAccessManagementService: AccessManagementService
  ) {}

  ngOnInit(): void {
    this.getRoleslistDetails();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy() {
    if (this.roleChangeSubscription) {
      this.roleChangeSubscription.unsubscribe();
    }
  }

  addNewRole() {
    const newRoleObj = {
      roleId: 0,
      roleName: this.newRoleName,
    };
    const serviceEndpoint = 'Role/AddRole';
    this._roleAccessManagementService
      .addNewRole(serviceEndpoint, newRoleObj)
      .subscribe({
        next: (data: any) => {
          this.dialog.open(SuccessPopupComponent, {
            width: '530px',
            data: {
              message: `New Role ${this.newRoleName} Added Successfully ! `,
            },
          });
          this.newRoleName = '';
          this.getRoleslistDetails();
        },
        error: (error: any) => {
          if (error.errorMessage === undefined) {
            error.errorMessage = `Role Name ${this.newRoleName} is Duplicate `;
            error.title = 'Duplicate Role Name !';
          }
          this.dialog.open(ValidationPopupComponent, {
            width: '530px',
            data: { message: error.errorMessage, title: error.title },
          });
          this.newRoleName = '';
        },
      });
  }

  openDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(RoleAccessManagementPopupComponent, {
      width: '900px',
      data: { element, isEditMode: true, title: 'Add Role Feature Assoc ' },
    });
    this.currentFilter = this.dataSource.filter;
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getRoleslistDetails();
        }
      },
    });
  }

  getRoleslistDetails() {
    const serviceEndpoint = 'Role/GetRoles';
    this._roleAccessManagementService.getRoleList(serviceEndpoint).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<PeriodicElement>(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       this.applyFilter({ target: { value: this.currentFilter } } as any, 'save');
      },
      error: (error: any) => {
        this.openValidationPopup(error.errorMessage, error.title);
      },
    });
  }

  private openValidationPopup(error: any, title: any) {
    this.dialog.open(ValidationPopupComponent, {
      width: '530px',
      data: { message: error, title: title }
    });
  }

  applyFilter(event: Event, type: string) {
    let filterValue: any;
    if (type === 'init') {
      filterValue = (event.target as HTMLInputElement).value;
    } else {
      filterValue = this.currentFilter;
    }

    this.dataSource.filterPredicate = (data, filter: string) => {
      if (data && data.roleName) {
        const searchTerms = filter.split(' ');
        return searchTerms.every((term) =>
          data.roleName.toLowerCase().includes(term)
        );
      } else {
        return false;
      }
    };
    // this.dataSource.filter = "";
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface PeriodicElement {
  roleName: string;
}
