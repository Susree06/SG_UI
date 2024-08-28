import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HolidaysInDaysEditComponent } from '../account-config-edits/holidays-in-days-edit/holidays-in-days-edit.component';
import { HolidaysService } from 'src/app/core/services/holidays-service';
import {
  AccountWiseconfiguration,
  HolidaysDetailsDto,
  HolidaysDto,
} from 'src/app/core/models/account-wise-configuration.model';
import { SearchResultPagingDto } from 'src/app/core/models/pagination.model';
import { MatPaginator } from '@angular/material/paginator';
import { merge, Observable, of as observableOf, pipe } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-holidays-in-days',
  templateUrl: './holidays-in-days.component.html',
  styleUrls: ['./holidays-in-days.component.scss'],
})
export class HolidaysInDaysComponent implements OnInit, AfterViewInit  {

  // years = [
  //   {
  //     id: 1,
  //     name: 2023,
  //   },
  //   {
  //     id: 2,
  //     name: 2024,
  //   },
  // ];

  displayedColumns = [
    'Accounts',
    'AccountManagerName',
    'Location',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Action',
  ];

  pagination: SearchResultPagingDto = new SearchResultPagingDto();
  dataSource = new MatTableDataSource<HolidaysDto>();
  public HolidaysDetails!: HolidaysDto[];
  totalCount!: number;
  currentYear:string;
  curDate:string;
  isEmpty: boolean = true;
  @ViewChild('paginator')
  paginator!: MatPaginator;
  pageSizeOptions:number[]=[5,10,25,50,100]

  constructor(
    public dialogRef: MatDialog,
    private holidaysService: HolidaysService
  ) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
    this.curDate = this.currentYear.substring(this.currentYear.length-2);
    this.getData();
    if (this.dataSource.data.length == 0) {
      this.isEmpty = true;
    }
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.holidaysService.getPaginatedHolidays().subscribe((data)=>{
      this.HolidaysDetails=data.holidaysDetailsDtos;
      this.totalCount=this.HolidaysDetails.length;
      this.dataSource.data =this.HolidaysDetails;
      this.dataSource = new MatTableDataSource(this.HolidaysDetails);
      this.dataSource.paginator = this.paginator;
      this.isEmpty = false;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter: string) => {
      if (data && data.accountName) {
        const searchTerms = filter.split(' ');
        return searchTerms.every(term =>
          (data.accountName.toLowerCase().includes(term))
        );
      } else {
        return false;
      }
    };
  }

  editAccDetails(element: any) {
    this.dialogRef.open(HolidaysInDaysEditComponent, {
      width: 'max-content',
      height: 'max-content',
      data: {
        HolidaysDetails: element,
      },
    });
  }
}
