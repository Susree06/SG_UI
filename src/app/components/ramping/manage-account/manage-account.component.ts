import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ManageAccountEditComponent } from '../manage-account-edit/manage-account-edit.component';
import { ShowCommentsComponent } from '../show-comments/show-comments.component';
import { RampUpDownService } from '../../../core/services/ramp-up-down.service';
import { SearchResultPagingDto } from 'src/app/core/models/pagination.model';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { ValidationPopupComponent } from '../../my-dashboard/validation-popup/validation-popup.component';
import { MatSort } from '@angular/material/sort';

export interface Element {
  Accounts: string;
  Projects:string;
  // Average:string;
  Location:string;
  Jan:number;
  Feb:number;
  Mar:number;
  Apr:number;
  May:number;
  Jun:number;
  Jul:number;
  Aug:number;
  Sep:number;
  Oct:number;
  Nov:number;
  Dec:number;
  Action:string
}

export interface ElementNew {
  Accounts: string;
  Projects:string;
  // Average:string;
  Location:string;
  Jan:number;
  Feb:number;
  Mar:number;
  Apr:number;
  May:number;
  Jun:number;
  Jul:number;
  Aug:number;
  Sep:number;
  Oct:number;
  Nov:number;
  Dec:number;
  // Probability: string;
  Action:string;
}


@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input()accountId!: number;
  displayedColumns : any = [];
  displayedData : any =[];
  filterData : any = null;
  dataSource  = new MatTableDataSource<any>();
  totalCount!: number;
  pagination: SearchResultPagingDto = new SearchResultPagingDto();
  emptyData = new MatTableDataSource([{ empty: "row" }]);
  isLoaded:boolean = false;
  pageSizeOptions:number[]=[5,10,25,50,100]
  currentFilter:any
  
constructor(private dialog: MatDialog, private _manageAccountService : RampUpDownService){
 
}

ngOnInit() {
  this.getAccountWiseHeadCount();
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

getAccountWiseHeadCount() {
  try {
    this.isLoaded = false;
    this.pagination.PageNumber =0;
    this.pagination.PageSize = 0;
    this.pagination.SearchCriteria = '';
    this._manageAccountService.getAccountWiseHeadCount().subscribe({
      next: (res:any) => {
        this.getColumnList(res);
        this.getDataforTable(res);
        this.isLoaded = true;
      },
      error: (error: any) => {
        this.openValidationPopup(error.errorMessage, error.title);
      }
    });
  }
  catch (err) {
    this.openValidationPopup(err, 'Error in getting Details !');
  }
}


getColumnList(dt : any) {
  if(dt.length > 0) {
    
  this.displayedColumns = [];
  for (let i = 0; i < dt[0].rampUpDownList.length; i++) {
    if(dt[0].rampUpDownList[i].label != "AccountId" && dt[0].rampUpDownList[i].label != "ProjectId" )
    this.displayedColumns.push(dt[0].rampUpDownList[i].label);
    
  }
 // this.displayedColumns.push('Action');
  } else {
    this.totalCount = 0;
  }
  

}

getDataforTable(dt : any) {
  this.displayedData = [];
  
  for (let i = 0; i < dt.length; i++) {
    var temp = { };
    for (let j = 0; j < dt[i].rampUpDownList.length; j++) {
      Object.assign(temp, {[dt[i].rampUpDownList[j].label] : dt[i].rampUpDownList[j].value}); 
      
    }
    this.totalCount = dt[i].totalCount;
    this.displayedData.push(temp);
    
  }
  this.isLoaded = true;
  this.dataSource = new MatTableDataSource<Element>(this.displayedData);    
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;  
  this.applyFilter({ target: { value: this.currentFilter } } as any, 'save');
}

  editAccount(accountId : any, projectId: any, location : any, account: any){
  var data = this.dialog.open(ManageAccountEditComponent,{
    maxWidth: '95vw',
    minHeight: '500px',
    width: '95%',
    panelClass: 'full-screen-modal',
    data : {
      accountId : accountId,
      projectId: projectId,
      location : location,
      account: account
    }
    });
    this.currentFilter = this.dataSource.filter;
    data.afterClosed().subscribe(() => {
      this.getAccountWiseHeadCount();
    })
  }

  viewAccDetails(){
    this.dialog.open(ShowCommentsComponent,{
      width:"519px",
      height:"447px"
    })
  }
  isSticky(column: string): boolean {
    return (column === 'Account' ? true : false || column === 'Project Name' ? true : false ||  column === 'Location' ? true : false ) ;
  }
  
  applyFilter(event: Event, type: string) {
    let filterValue = '';
    if (type === 'init') {
      filterValue = (event.target as HTMLInputElement).value;
    } else {
      filterValue = this.currentFilter;
    }
    this.dataSource.filterPredicate = (data, filter: string) => {
      if (data && data.Account && data["Project Name"]) {
        const searchTerms = filter.split(' ');
        return searchTerms.every(
          (term) =>
            data.Account.toLowerCase().includes(term)  || 
            data["Project Name"].toLowerCase().includes(term)
        );
      } else {
        return false;
      }
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  private openValidationPopup(error: any, title: any) {
    this.dialog.open(ValidationPopupComponent, {
      width: '530px',
      data: { message: error, title: title }
    });
  }
}

