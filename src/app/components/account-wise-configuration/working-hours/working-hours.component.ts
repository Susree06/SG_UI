import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkingHoursEditComponent } from '../account-config-edits/working-hours-edit/working-hours-edit.component';
import { WorkingHours } from 'src/app/core/models/account-wise-configuration.model';
import { WorkingHoursService } from 'src/app/core/services/working-hours.service';
import { SearchResultPagingDto } from 'src/app/core/models/pagination.model';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { merge, Observable, of as observableOf, pipe, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.scss'],
})
export class WorkingHoursComponent implements OnInit {

  //public filteredWorkingHoursList: ReplaySubject<WorkingHours[]> = new ReplaySubject<WorkingHours[]>(1);
  displayedColumns = [
    'Accounts',
    'AccountManager',
    'Location',
    'Hours',
    'Action',
  ];

  isEmpty: boolean = true;
  dataSource = new MatTableDataSource<WorkingHours>();
  workingHoursDetails!: WorkingHours[];
  totalCount!: number;
  isLoaded:boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialog,
    private workingHoursService: WorkingHoursService
  ) {}

  ngOnInit(): void {
    this.getData();
    if (this.dataSource.data.length == 0) {
      this.isEmpty = true;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.workingHoursService.getConfig().subscribe((data)=>{
      this.workingHoursDetails=data.workingHoursDtos;
      this.totalCount=this.workingHoursDetails.length;
      this.dataSource.data=this.workingHoursDetails;
      this.dataSource=new MatTableDataSource(this.workingHoursDetails);
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
    this.dialogRef.open(WorkingHoursEditComponent, {
      minWidth: 'max-content',
      minHeight: 'max-content',
      data: {
        workingHoursdata: element,
      },
    });
  }
}
