import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeavesInPercentageEditComponent } from '../account-config-edits/leaves-in-percentage-edit/leaves-in-percentage-edit.component';
import { SearchResultPagingDto } from 'src/app/core/models/pagination.model';
import { LeavesService } from 'src/app/core/services/leaves.service';
import { LeavesDto } from 'src/app/core/models/account-wise-configuration.model';
import { MatPaginator } from '@angular/material/paginator';
import { merge, Observable, of as observableOf, pipe } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-leaves-in-percentage',
  templateUrl: './leaves-in-percentage.component.html',
  styleUrls: ['./leaves-in-percentage.component.scss'],
})
export class LeavesInPercentageComponent implements OnInit, AfterViewInit {
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
  isEmpty: boolean = true;
  dataSource = new MatTableDataSource<LeavesDto>();
  public LeavesDetails: LeavesDto[] = [];
  totalCount!: number;
  currentYear:string;
  curDate:string;
  @ViewChild('paginator')paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialog,
    private leavesService: LeavesService
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
    this.leavesService.getConfig().subscribe((data)=>{
      this.LeavesDetails=data.leavesDtos;
      this.totalCount=this.LeavesDetails.length;
      this.dataSource.data =this.LeavesDetails;
      this.dataSource = new MatTableDataSource(this.LeavesDetails);
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
    this.dialogRef.open(LeavesInPercentageEditComponent, {
      width: 'max-content',
      height: 'max-content',
      data: {
        leaveData: element,
      },
    });
  }
}
