import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MonthlyFilterComponent } from '../filters/monthly-filter/monthly-filter.component';
import { QuaterlyFilterComponent } from '../filters/quaterly-filter/quaterly-filter.component';
import { BiAnnuallyFilterComponent } from '../filters/bi-annually-filter/bi-annually-filter.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SearchResultPagingDto } from 'src/app/core/models/pagination.model';
import { MatPaginator } from '@angular/material/paginator';
import { SalesGuidanceDto } from 'src/app/core/models/sales-guidance.model';
import { SalesGuidanceService } from 'src/app/core/services/sales-guidance.service';
import { MatSelect } from '@angular/material/select';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
@Component({
  selector: 'app-sales-guidance',
  templateUrl: './sales-guidance.component.html',
  styleUrls: ['./sales-guidance.component.scss']
})
export class SalesGuidanceComponent {
  public salesGuidanceList: SalesGuidanceDto[] = [];
  displayedColumns = ['AccountName','Location','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  currentTabId:number=0;
  salesGuidanceForm!: FormGroup;
  lastYear :any;
  thisYear: any;
  nextYear:any;
  public yearsList! : any;
  public values:any=[];
  accountId : any;
  selectedYear1:any;
  selectedYear2:any;
  dataSource = new MatTableDataSource<SalesGuidanceDto>();
  pagination: SearchResultPagingDto = new SearchResultPagingDto();
  @ViewChild('paginator')
  paginator!: MatPaginator;
  totalCount!: number;
  salesGuidance : any;
  url: SafeResourceUrl;
  //@ViewChild('matRef') matRef: MatSelect;
  constructor(private router: Router,public dialogRef: MatDialog,private fb: FormBuilder,
    private salesGuidanceService: SalesGuidanceService, sanitizer: DomSanitizer){
      this.url = sanitizer.bypassSecurityTrustResourceUrl("https://app.powerbi.com/reportEmbed?reportId=31014ce4-10aa-4626-a2a8-cefb97e7fab1&autoAuth=true&ctid=77428205-87ff-4048-a645-91b337240228");
  }
  ngOnInit(): void {
    this.thisYear = (new Date()).getFullYear();
    this.lastYear = this.thisYear-1;
    this.nextYear = this.thisYear+1;
    this.yearsList=[{id:1,name:this.lastYear},{id:2,name:this.thisYear},{id:3,name:this.nextYear}];
    this.salesGuidanceForm = this.fb.group({
      year1Ctrl: new FormControl(),
      year2Ctrl: new FormControl()
   });
   this.salesGuidanceService.getSalesGuidanceReport(this.selectedYear1 > 0 ? this.selectedYear1 : this.lastYear, this.selectedYear2 > 0 ? this.selectedYear2 : this.thisYear)
   .subscribe(data => {
    this.salesGuidance = data;
 });
   }
   selectYear1(item:any){
    this.values= item;
    this.selectedYear1 = this.values.name;
    if(this.selectedYear2 > 0)
    {
    this.salesGuidanceService.getSalesGuidanceReport(this.selectedYear1 > 0 ? this.selectedYear1 : this.lastYear, this.selectedYear2 > 0 ? this.selectedYear2 : this.thisYear)
    .subscribe(data => {
     this.salesGuidance = data;
  });
}
  }

  // getData(pageno: number, size: number) {
  //   this.pagination.PageNumber = pageno;
  //   this.pagination.PageSize = size;
  //   return this.salesGuidanceService.getSalesGuidanceReport(this.pagination,  this.selectedYear1, this.selectedYear2);
  // }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;

  //   this.paginator.page
  //     .pipe(
  //       startWith({}),
  //       switchMap(() => {
  //         return this.getData(
  //           this.paginator.pageIndex + 1,
  //           this.paginator.pageSize
  //         ).pipe(catchError(() => observableOf(null)));
  //       }),
  //       map((empData) => {
  //         if (empData == null) return [];
  //         this.totalCount = empData.count;
  //         return empData.workFlowDashboardDtos; 
  //       })
  //     )
  //     .subscribe((empData) => {
  //       this.salesGuidanceList = empData;
  //       this.dataSource = new MatTableDataSource(this.salesGuidanceList);
  //     });
  // }
  
  selectYear2(item:any){
    this.values= item;
    this.selectedYear2 = this.values.name;
    if(this.selectedYear1 > 0 && this.selectedYear2 > 0)
    {
    this.salesGuidanceService.getSalesGuidanceReport(this.selectedYear1 > 0 ? this.selectedYear1 : this.lastYear, this.selectedYear2 > 0 ? this.selectedYear2 : this.thisYear)
    .subscribe(data => {
     this.salesGuidance = data;
     });
    }
  }
  clearSelectedOptions()
  {
    this.salesGuidanceForm.controls['year1Ctrl'].setValue(null);
    this.salesGuidanceForm.controls['year2Ctrl'].setValue(null);
    this.selectYear1=null;
    this.selectYear2=null;
  }

  backToManageAcc(){
    this.router.navigate(['/manage-account'])
  }

  onFilter(): void {
    if(this.currentTabId==0){
    const dialogRef = this.dialogRef.open(MonthlyFilterComponent, {
      width: '614px',
      height: '275px'
    });
    dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    });
  }
  else if(this.currentTabId == 1){
    const dialogRef = this.dialogRef.open(QuaterlyFilterComponent, {
      width: '614px',
      height: '275px'
    });
    dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    });
  }
  else{
    const dialogRef = this.dialogRef.open(BiAnnuallyFilterComponent, {
      width: '614px',
      height: '275px'
    });
    dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    });
  }
  }
  
  tabClick($event:any) {
    this.currentTabId = $event.index;
    console.log($event.index);
  }
}
function observableOf(arg0: null): any {
  throw new Error('Function not implemented.');
}

