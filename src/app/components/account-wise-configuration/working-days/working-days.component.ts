import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkingDaysEditComponent } from '../account-config-edits/working-days-edit/working-days-edit.component';
import { WorkingDaysService } from 'src/app/core/services/working-days.service';
import { SearchResultPagingDto } from 'src/app/core/models/pagination.model';
import { WorkingDaysDto } from 'src/app/core/models/account-wise-configuration.model';
import { MatPaginator } from '@angular/material/paginator';
import { merge, Observable, of as observableOf, pipe } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-working-days',
  templateUrl: './working-days.component.html',
  styleUrls: ['./working-days.component.scss'],
})
export class WorkingDaysComponent implements OnInit {

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

  dataSource = new MatTableDataSource<WorkingDaysDto>();
  pagination: SearchResultPagingDto = new SearchResultPagingDto();
  public WorkingDaysDetails: WorkingDaysDto[] = [];
  totalCount!: number;

  isEmpty: boolean = true;
  currentYear:string;
  curDate:string;
  pageSizeOptions:number[]=[5,10,25,50,100]

  @ViewChild('paginator')
  paginator!: MatPaginator;

  constructor(
    public dialogRef: MatDialog,
    private workingDaysService: WorkingDaysService
  ) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
    this.curDate = this.currentYear.substring(this.currentYear.length-2);
    this.getData();
    if (this.dataSource.data.length == 0) {
      this.isEmpty = true;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.workingDaysService.getConfig().subscribe((data)=>{
      this.WorkingDaysDetails=data.workingDaysDtos;
      this.totalCount=this.WorkingDaysDetails.length;
      this.dataSource.data=this.WorkingDaysDetails;
      this.dataSource = new MatTableDataSource(this.WorkingDaysDetails);
      this.dataSource.paginator=this.paginator;
      this.isEmpty=false;
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
    this.dialogRef.open(WorkingDaysEditComponent, {
      width: 'max-content',
      height: 'max-content',
      data: {
        workingDaysdata: element,
      },
    });
  }

}
