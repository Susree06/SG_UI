import { GeoLocationConfigurationService } from './../../core/services/geoLocation-configuration.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GeoLocationDto } from 'src/app/core/models/geoLocation-configuration.model';
import { SearchResultPagingDto } from 'src/app/core/models/pagination.model';
import { GeoLocationConfigurationEditComponent } from './geoLocation-configuration-edit/geoLocation-configuration-edit.component';

@Component({
  selector: 'app-geoLocation-connfiguration',
  templateUrl: './geoLocation-configuration.component.html',
  styleUrls: ['./geoLocation-configuration.component.scss'],
})
export class GeoLocationConfigurationComponent implements OnInit {
  displayedColumns = ['locationName', 'locationCode', 'Action'];
  totalCount!: number;
  isAdmin: boolean = false;
  isBdm: boolean = false;
  isEmpty: boolean = true;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pagination: SearchResultPagingDto = new SearchResultPagingDto();
  dataSource = new MatTableDataSource<GeoLocationDto>();
  currentFilter: any;
  public GeoLocationConfigDetails!: GeoLocationDto[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialog,
    private GeoLocationConfigurationService: GeoLocationConfigurationService
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
    this.getGeoLocationConfig();
    if (this.dataSource.data.length == 0) {
      this.isEmpty = true;
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getGeoLocationConfig() {
    this.GeoLocationConfigurationService.getGeoLocationConfig().subscribe(
      (data) => {
        this.GeoLocationConfigDetails = data;
        this.totalCount = this.GeoLocationConfigDetails.length;
        this.dataSource.data = this.GeoLocationConfigDetails;
        this.dataSource = new MatTableDataSource(this.GeoLocationConfigDetails);
        this.dataSource.paginator = this.paginator;
        this.isEmpty = false;
        this.applyFilter({ target: { value: this.currentFilter } } as any, 'save');
      }
    );
  }
  applyFilter(event: Event, type: string) {
    let filterValue = '';
    if (type === 'init') {
      filterValue = (event.target as HTMLInputElement).value;
    } else {
      filterValue = this.currentFilter;
    }
    this.dataSource.filterPredicate = (data, filter: string) => {
      if (data && data.locationName) {
        const searchTerms = filter.split(' ');
        return searchTerms.every((term) =>
          data.locationName.toLowerCase().includes(term)
        );
      } else {
        return false;
      }
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addEditConfig(row?: GeoLocationDto) {
    const newAccountDialog = this.dialogRef.open(
      GeoLocationConfigurationEditComponent,
      {
        width: 'max-content',
        minHeight:'250px',
        data: {
          IgConfigurationList: this.GeoLocationConfigDetails,
          action: !row ? 'Add' : 'Edit',
          rowData: row,
        },
      }
    );
    this.currentFilter = this.dataSource.filter;
    newAccountDialog.afterClosed().subscribe((result) => {
      this.getGeoLocationConfig();
    });
  }
}
