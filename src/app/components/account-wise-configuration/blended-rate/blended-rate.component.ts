import { SuccessPopupComponent } from './../../my-dashboard/success-popup/success-popup.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BlendedRateEditComponent } from '../account-config-edits/blended-rate-edit/blended-rate-edit.component';
import { CreateNewAccountComponent } from '../create-new-account/create-new-account.component';
import { SearchResultPagingDto } from 'src/app/core/models/pagination.model';
import { BlendedRateDto } from 'src/app/core/models/account-wise-configuration.model';
import { BlendedRatesService } from 'src/app/core/services/blended-rates.service';
import { MatPaginator } from '@angular/material/paginator';
import { merge, Observable, of as observableOf, pipe } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AlertPopupComponent } from './alert-popup/alert-popup.component';
@Component({
  selector: 'app-blended-rate',
  templateUrl: './blended-rate.component.html',
  styleUrls: ['./blended-rate.component.scss'],
})
export class BlendedRateComponent implements OnInit {
  displayedColumns = [
    'Accounts',
    'AccountManagerName',
    'ProjectName',
    'ContractType',
    'BlendedRate',
    'Location',
    'ProbabilityInPercentage',
    'Action',
  ];

  pagination: SearchResultPagingDto = new SearchResultPagingDto();
  dataSource = new MatTableDataSource<BlendedRateDto>();
  public BlendedRatesDetails!: BlendedRateDto[];
  isEmpty: boolean = true;
  isAdmin: boolean = false;
  isBdm: boolean = false;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  @ViewChild('paginator')
  paginator!: MatPaginator;
  emptyData = new MatTableDataSource([{ empty: 'row' }]);
  currentFilter: any = '';

  constructor(
    public dialogRef: MatDialog,
    private blendedRatesService: BlendedRatesService
  ) {
    if (
      sessionStorage.getItem('isAdmin') !== null &&
      sessionStorage.getItem('isBDM') !== null
    ) {
      this.isAdmin =
        sessionStorage.getItem('isAdmin') == 'false' ? false : true;
      this.isBdm = sessionStorage.getItem('isBDM') == 'false' ? false : true;
    }
  }

  ngOnInit(): void {
    this.GetBlendedRate();
    if (this.dataSource.data.length == 0) {
      this.isEmpty = true;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  GetBlendedRate() {
    this.blendedRatesService.getBlendedRates().subscribe({
      next: (data) => {
        this.BlendedRatesDetails = data.blendedRateDtos;
        this.dataSource = new MatTableDataSource<any>(this.BlendedRatesDetails);
        this.dataSource.paginator = this.paginator;
        this.isEmpty = false;
        this.applyFilter(
          { target: { value: this.currentFilter } } as any,
          'save'
        );
      },
    });
  }

  getData() {
    return this.blendedRatesService.getBlendedRates();
  }

  applyFilter(event: Event, type: string) {
    let filterValue = '';
    if (type === 'init') {
      filterValue = (event.target as HTMLInputElement).value;
    } else {
      filterValue = this.currentFilter;
    }
    this.dataSource.filterPredicate = (data, filter: string) => {
      if (data && data.accountName && data.projectName) {
        const searchTerms = filter.split(' ');
        return searchTerms.every(
          (term) =>
            data.accountName.toLowerCase().includes(term) ||
            data.projectName.toLowerCase().includes(term)
        );
      } else {
        return false;
      }
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editAccDetails(element: any) {
    this.dialogRef.open(BlendedRateEditComponent, {
      width: '472px',
      height: '630px',
      data: {
        BlendedRatesDetails: element,
      },
    });
  }
  deleteAccDetails(element: any) {
    var projectId = element.projectId;
    var accountId = element.accountId;
    var type = element.projectType;
    var location = element.location;
    const deleteDialog = this.dialogRef.open(AlertPopupComponent, {
      height: '150px',
      width: '360px',
      data: {
        title: 'Are you sure you want to delete?',
      },
    });
    this.currentFilter = this.dataSource.filter;
    deleteDialog.afterClosed().subscribe((res) => {
      if (!deleteDialog.componentInstance.isCancelled) {
        this.blendedRatesService
          .deleteAccount(accountId, projectId, type, location)
          .subscribe((result) => {});
      }
      this.GetBlendedRate();
    });
  }
  addNew() {
    const newAccountDialog = this.dialogRef.open(CreateNewAccountComponent, {
      width: '472px',
      height: '675px',
    });
    this.currentFilter = this.dataSource.filter;
    newAccountDialog.afterClosed().subscribe((result) => {
      this.GetBlendedRate();
    });
  }
}
