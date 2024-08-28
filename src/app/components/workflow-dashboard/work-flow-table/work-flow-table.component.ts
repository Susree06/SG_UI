import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ShowCommentsComponent } from '../../ramping/show-comments/show-comments.component';
import { WorkFlowDashboardDto } from 'src/app/core/models/work-flow-dashboard.model';
import { SearchResultPagingDto } from 'src/app/core/models/pagination.model';
import { MatPaginator } from '@angular/material/paginator';
import { WorkFlowDashboardService } from 'src/app/core/services/work-flow-dashboard.service';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AccountService } from 'src/app/core/services/account.service';
import { AccountDetails } from 'src/app/core/models/account-wise-configuration.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationPopupComponent } from '../../my-dashboard/validation-popup/validation-popup.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-work-flow-table',
  templateUrl: './work-flow-table.component.html',
  styleUrls: ['./work-flow-table.component.scss']
})
export class WorkFlowTableComponent implements OnInit {
  workFlowForm!: FormGroup;
  public WorkFlowDashboardList: WorkFlowDashboardDto[] = [];
  displayedColumns = [
    'Accounts',
    'Project',
    'Year',
    'Month',
    'Location',
    'DMApprover',
    'DMStatus',
    'BDMApprover',
    'BDMStatus',
    'Comment',
  ];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  dataSource = new MatTableDataSource<WorkFlowDashboardDto>();
  pagination: SearchResultPagingDto = new SearchResultPagingDto();
  @ViewChild('paginator')
  paginator!: MatPaginator;
  totalCount!: number;
  public values: any = [];
  accountId: any =0;
  public YearList!: any;
  public AccountsList!: AccountDetails[];
  year: any =0;
  public MonthList!: any;
  isLoaded: boolean = false;
  month: any='';
  currentMonth: any;
  currentYear: number;
  pageSizeOptions:number[]=[5,10,25,50,100];
  filteredAccountOptions!: Observable<any[]> | undefined
  searchCtrlAccountType = new FormControl('');

  constructor(public dialogRef: MatDialog, private fb: FormBuilder,
    private workFlowDashboardService: WorkFlowDashboardService,
    private accountService: AccountService,
    private dialog: MatDialog) {
  }

  selectAccountName(item: any) {
    this.values = item;
    this.accountId = this.values.accountId;
    this.getWorkFlowDashboardList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.accountService.getAllAccounts().subscribe(data => {
      this.AccountsList = data;
      this.isLoaded = true;
      this.filteredAccountOptions = this.searchCtrlAccountType.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : "";
          return name ? this.accountFilter(name as string) : this.AccountsList.slice();
        }),
      );
    });

    this.workFlowDashboardService.getYears().subscribe(data => {
      this.YearList = data;
      this.isLoaded = true;
    });
    this.getWorkFlowDashboardList()

    this.workFlowForm = this.fb.group({
      accountCtrl: [this.AccountsList],
      yearCtrl: [this.YearList],
      monthCtrl: [this.MonthList],
    });

    

  }


  private accountFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.AccountsList.filter((option: { customerName: string; }) => option.customerName.toLowerCase().includes(filterValue));
  }

  getWorkFlowDashboardList(){
    const d = new Date();
    this.currentMonth = this.months[d.getMonth()];;
    this.currentYear = d.getFullYear();
    try {
      this.workFlowDashboardService.getAccountWiseStatus(this.accountId , this.year, this.month).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource<any>(res.workFlowDashboardDtos);
          this.dataSource.paginator = this.paginator;
          this.isLoaded = true;
        },
        error: (error: any) => {
           this.openValidationPopup(error.errorMessage, error.title);
        },
      });
    } catch (err) {
      this.openValidationPopup(err, 'Error in getting Role Details !');
    }
  }
  viewAccDetails(element: any) {

    this.dialogRef.open(ShowCommentsComponent, {
      width: '850px',
      minHeight: '300px',
      data: {
        comments: element.workFlowdashboardComments,
        accountName: element.accounts
      },
    });
  }

  selectYear(item: any) {
    this.year = item;
    this.getWorkFlowDashboardList();
  }

  selectMonth(item: any) {
    this.month = item;
    this.getWorkFlowDashboardList();
  }

  clearSelectedOptions() {
    this.workFlowForm.controls['accountCtrl'].reset();
    this.workFlowForm.controls['yearCtrl'].reset();
    this.workFlowForm.controls['monthCtrl'].reset();
    this.accountId = 0;
    this.year = 0;
    this.month = '';
    this.getWorkFlowDashboardList();
  }
  private openValidationPopup(error: any, title: any) {
    this.dialog.open(ValidationPopupComponent, {
      width: '530px',
      data: { message: error, title: title },
    });
  }
}

function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}

