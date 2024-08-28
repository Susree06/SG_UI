import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RampUpDownService } from '../../../core/services/ramp-up-down.service';
import { SearchResultPagingDto } from 'src/app/core/models/pagination.model';
import { MatPaginator } from '@angular/material/paginator';
import { FixedMonthlyAccountEditComponent } from '../fixed-monthly-account-edit/fixed-monthly-account-edit.component';
import { Subscription } from 'rxjs';
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
  selector: 'app-fixed-monthly-account',
  templateUrl: './fixed-monthly-account.component.html',
  styleUrls: ['./fixed-monthly-account.component.scss']
})
export class FixedMonthlyAccountComponent implements AfterViewInit, OnInit,OnDestroy {
  displayedColumns: any[] = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  CountryList: any;
  visaTypeList: any;
  hasEditAccess:boolean =false;
  hasViewAccess:boolean =false;
  roleChangeSubscription!: Subscription;
  pagination: SearchResultPagingDto = new SearchResultPagingDto();
  displayedData : any = [];
  isLoaded:boolean = false;
  currentFilter: any = '';

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(public dialog: MatDialog, private _fixedMonthlyAccountService:RampUpDownService ) { }

  ngOnInit(): void {
    this.getFixedMonthlyAccountDetails();
   
  }

  ngOnDestroy() {
    if (this.roleChangeSubscription) {
      this.roleChangeSubscription.unsubscribe();
    }
  }

  getFixedMonthlyAccountDetails() {
    try {
      this.isLoaded = false;
      this.pagination.PageNumber =0;
      this.pagination.PageSize = 0;
      this.pagination.SearchCriteria = '';
      this._fixedMonthlyAccountService.getFixedMonthlyAccountDetails('Fixed Monthly Billing').subscribe({
        next: (res:any) => {
          this.getColumnData(res);
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

  getColumnData(dt){
    if(dt.length > 0) {
    
      this.displayedColumns = [];
      for (let i = 0; i < dt[0].fPandFMBList.length; i++) {
        if(dt[0].fPandFMBList[i].label != "AccountId" && dt[0].fPandFMBList[i].label != "ProjectId" )
        this.displayedColumns.push(dt[0].fPandFMBList[i].label);
        
      }
    //  this.displayedColumns.push('Action');
      }
      
  }
  getDataforTable(dt : any) {
    this.displayedData = [];
    
    for (let i = 0; i < dt.length; i++) {
      var temp = { };
      for (let j = 0; j < dt[i].fPandFMBList.length; j++) {
        Object.assign(temp, {[dt[i].fPandFMBList[j].label] : dt[i].fPandFMBList[j].value}); 
        
      }
     // this.totalCount = dt[i].totalCount;
      this.displayedData.push(temp);
      
    }
    this.isLoaded = true;
    this.dataSource = new MatTableDataSource<Element>(this.displayedData);    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.applyFilter({ target: { value: this.currentFilter } } as any, 'save');
  }

  isSticky(column: string): boolean {
    return (column === 'Account' ? true : false || column === 'Project Name' ? true : false ||  column === 'Location' ? true : false ) ;
  }

  isEditMode: boolean = true;
  openEditDialog(element: any): void {
    try {
      const dialogRef = this.dialog.open(FixedMonthlyAccountEditComponent, {
        maxWidth: '95vw',
        minHeight: '300px',
        // height: '90%',
        width: '95%',
        panelClass: 'full-screen-modal',
        data: { element,  title: "Fixed Monthly Details" },
      });
      this.currentFilter = this.dataSource.filter;
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          //if (val) {
            this.getFixedMonthlyAccountDetails();
          //}
        },
      });
    }
    catch (err) {
      this.openValidationPopup(err, 'Error in Opening Dialogue Box !');
    }
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

