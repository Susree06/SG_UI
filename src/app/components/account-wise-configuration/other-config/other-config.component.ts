import { OtherConfigService } from './../../../core/services/other-config.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OtherConfigDto } from 'src/app/core/models/account-wise-configuration.model';
import { MatDialog } from '@angular/material/dialog';
import { OtherConfigEditComponent } from '../account-config-edits/other-config-edit/other-config-edit.component';

@Component({
  selector: 'app-other-config',
  templateUrl: './other-config.component.html',
  styleUrls: ['./other-config.component.scss'],
})
export class OtherConfigComponent implements OnInit {
  displayedColumns = ['Accounts', 'Ig', 'Geo-Location', 'Action'];
  totalCount!: number;
  isAdmin: boolean = false;
  isBdm: boolean = false;
  isEmpty: boolean = true;
  dataSource = new MatTableDataSource<OtherConfigDto>();
  public OtherConfigDetails!: OtherConfigDto[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentFilter: any;

  constructor(
    public dialogRef: MatDialog,
    private OtherConfigService: OtherConfigService
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

  ngOnInit() {
    this.getOtherConfig();
    if (this.dataSource.data.length == 0) {
      this.isEmpty = true;
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getOtherConfig() {
    this.OtherConfigService.getOtherConfig().subscribe((data) => {
      this.OtherConfigDetails = data;
      this.totalCount = this.OtherConfigDetails.length;
      this.dataSource.data = this.OtherConfigDetails;
      this.dataSource = new MatTableDataSource(this.OtherConfigDetails);
      this.dataSource.paginator = this.paginator;
      this.isEmpty = false;
      this.applyFilter(
        { target: { value: this.currentFilter } } as any,
        'save'
      );
    });
  }
  applyFilter(event: Event, type: string) {
    let filterValue = '';
    if (type === 'init') {
      filterValue = (event.target as HTMLInputElement).value;
    } else {
      filterValue = this.currentFilter;
    }
    this.dataSource.filterPredicate = (data, filter: string) => {
      if (data && data.accountName) {
        const searchTerms = filter.split(' ');
        return searchTerms.every((term) =>
          data.accountName.toLowerCase().includes(term)
        );
      } else {
        return false;
      }
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addEditConfig(row?: OtherConfigDto) {
    const newAccountDialog = this.dialogRef.open(OtherConfigEditComponent, {
      width: 'max-content',
      height: 'max-content',
      data: {
        otherConfigList: this.OtherConfigDetails,
        action: !row ? 'Add' : 'Edit',
        rowData: row,
      },
    });
    this.currentFilter = this.dataSource.filter;
    newAccountDialog.afterClosed().subscribe((result) => {
      this.getOtherConfig();
    });
  }
}
