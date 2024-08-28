import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserConfigDetailsComponent } from './user-config-details/user-config-details.component';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/core/services/account.service';
import { AccountDetails } from 'src/app/core/models/account-wise-configuration.model';
import { UserConfigService } from 'src/app/core/services/user-config.service';
import { SearchResultPagingDto } from 'src/app/core/models/pagination.model';
import {
  UsersDto,
} from 'src/app/core/models/user-config.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ValidationPopupComponent } from '../my-dashboard/validation-popup/validation-popup.component';

@Component({
  selector: 'app-user-configuration',
  templateUrl: './user-configuration.component.html',
  styleUrls: ['./user-configuration.component.scss'],
})
export class UserConfigurationComponent implements OnInit, AfterViewInit {
  public AccountsList!: AccountDetails[];
  pagination: SearchResultPagingDto = new SearchResultPagingDto();
  totalCount!: number;
  public usersList!: UsersDto[];
  dataSource = new MatTableDataSource<any>();
  @ViewChild('paginator')
  paginator!: MatPaginator;
  isLoaded: boolean = false;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  currentFilter: any = '';
  constructor(
    private userService: UserConfigService,
    public dialog: MatDialog  ) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.userService.getUserConfiguredAccounts().subscribe((data) => {
      this.AccountsList = data;
    });
    this.userService.getAllUsers().subscribe((data) => {
      this.usersList = data;
    });
    this.getUserConfigList();
  }
  displayedColumns = ['Accounts', 'DM', 'BDM', 'Action'];

  getUserConfigList() {
    try {
      this.userService.getUserConfigs().subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource<any>(res.userDetailsDtos);
          this.dataSource.paginator = this.paginator;
          this.applyFilter({ target: { value: this.currentFilter } } as any, 'save');
        },
        error: (error: any) => {
           this.openValidationPopup(error.errorMessage, error.title);
        },
      });
    } catch (err) {
      this.openValidationPopup(err, 'Error in getting Role Details !');
    }
  }

  applyFilter(event: Event, type: string) {
    let filterValue = '';
    if (type === 'init') {
      filterValue = (event.target as HTMLInputElement).value;
    } else {
      filterValue = this.currentFilter;
    }
    this.dataSource.filterPredicate = (data, filter: string) => {
      if (data && data.accounts) {
        const searchTerms = filter.split(' ');
        return searchTerms.every(
          (term) =>
            data.accounts.toLowerCase().includes(term)       
        );
      } else {
        return false;
      }
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  viewAccDetails(element?: any) {
    const dialogRef = this.dialog.open(UserConfigDetailsComponent, {
      width: '720px',
      // height: '70%',
      data: {
        workFlowDashboardData: element,
        allAccounts: this.AccountsList,
        allUsers: this.usersList,
        action: element ? 'edit' : '',
      },
    });
    this.currentFilter = this.dataSource.filter;
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getUserConfigList();
      }
    });
  }

  private openValidationPopup(error: any, title: any) {
    this.dialog.open(ValidationPopupComponent, {
      width: '530px',
      data: { message: error, title: title },
    });
  }
}
