import { IgConfigurationService } from './../../core/services/ig-configuration.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IgConfigurationDTO } from 'src/app/core/models/ig-configuration.model';
import { SearchResultPagingDto } from 'src/app/core/models/pagination.model';
import { IgConfigurationDetailsComponent } from './ig-configuration-details/ig-configuration-details.component';

@Component({
  selector: 'app-ig-configuration',
  templateUrl: './ig-configuration.component.html',
  styleUrls: ['./ig-configuration.component.scss']
})
export class IgConfigurationComponent implements OnInit {
  displayedColumns = ['igName','igCode', 'igHead', 'Action'];
  totalCount!: number;
  isAdmin: boolean = false;
  isBdm: boolean = false;
  isEmpty: boolean = true;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  pagination: SearchResultPagingDto = new SearchResultPagingDto();
  dataSource = new MatTableDataSource<IgConfigurationDTO>();
  public IgConfigDetails!: IgConfigurationDTO[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentFilter:any;
  constructor(
    public dialogRef: MatDialog,
    private IgConfigurationService: IgConfigurationService
  ) {
    if (
      sessionStorage.getItem('isAdmin') !== null &&
      sessionStorage.getItem('isBDM') !== null
    ) {
      this.isAdmin = sessionStorage.getItem('isAdmin') == 'false' ? false : true;
      this.isBdm = sessionStorage.getItem('isBDM') == 'false' ? false : true;
    }

  }

  ngOnInit() {
    this.getIgConfig();
    if (this.dataSource.data.length == 0) {
      this.isEmpty = true;
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getIgConfig() {
    this.IgConfigurationService.getIgConfig().subscribe((data) => {
      this.IgConfigDetails = data;
      this.totalCount = this.IgConfigDetails.length;
      this.dataSource.data = this.IgConfigDetails;
      this.dataSource = new MatTableDataSource(this.IgConfigDetails);
      this.dataSource.paginator = this.paginator;
      this.isEmpty = false;
      this.applyFilter({ target: { value: this.currentFilter } } as any, 'save');
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
      if (data && data.igName) {
        const searchTerms = filter.split(' ');
        return searchTerms.every(term =>
          (data.igName.toLowerCase().includes(term))
        );
      } else {
        return false;
      }
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addEditConfig(row?: IgConfigurationDTO) {
    const newAccountDialog = this.dialogRef.open(IgConfigurationDetailsComponent, {
      width: 'max-content',
      minHeight:'270px',
      data: {
        IgConfigurationList: this.IgConfigDetails,
        action: !row ? 'Add' : 'Edit',
        rowData: row,
      }
    });
    this.currentFilter = this.dataSource.filter;
    newAccountDialog.afterClosed().subscribe((result) => {
      this.getIgConfig();
    });

  }

}
