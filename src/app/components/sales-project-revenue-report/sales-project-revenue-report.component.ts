import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { SalesReportService } from 'src/app/core/services/sales-report.service';
import { YearsServices } from 'src/app/core/services/years.services';
import * as XLSX from 'xlsx';
import { SalesReportFilterComponent } from '../sales-report-filter/sales-report-filter.component';

@Component({
  selector: 'app-sales-project-revenue-report',
  templateUrl: './sales-project-revenue-report.component.html',
  styleUrls: ['./sales-project-revenue-report.component.scss']
})
export class SalesProjectRevenueReportComponent {
  ProjectsList: any[] = [];
  selectedTabName: any;
  isLoaded: boolean = false;
  apiSubscription: Subscription | undefined;
  quterlyData: any;
  halfYearlyData: any;
  yearlyData: any;
  monthlyData: any;
  tabSelected: string;
  selectedAccount: any;
  selectedYear: any[] = [];
  selectedMonth: any[] = ['Jan', 'Feb', 'Mar'];
  selectedQuarter: any[] = ['Q1'];
  selectedHalfYearly: any[] = ['H1'];
  displayedYearlyCol: string[] = [];
  displayedHalfYearlyCol: string[] = [];
  displayedQuarterlyCol: string[] = [];
  displayedMonthlyCol: string[] = [];
  YearlyDataSource = new MatTableDataSource<any>();
  HalfYearlyDataSource = new MatTableDataSource<any>();
  QuarterlyDataSource = new MatTableDataSource<any>();
  MonthlyDataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('YearlyPaginator') YearlyPaginator!: MatPaginator;
  @ViewChild('MonthlyPaginator') MonthlyPaginator!: MatPaginator;
  @ViewChild('HalfYearlyPaginator') HalfYearlyPaginator!: MatPaginator;
  @ViewChild('QuarterlyPaginator') QuarterlyPaginator!: MatPaginator;
  filteredAccount: any[] = [];
  SelectedProjectName: any;
  Years: any[] = [];
  showMonthlyDropdown: boolean = true;
  showQurterlyDropdown: boolean = true;
  showHalfYearlyDropdown: boolean = true;

  constructor(
    private _fb: FormBuilder,public dialog: MatDialog,
    private yearService: YearsServices,private salesReportService: SalesReportService,
    private accountService: AccountService
  ) { }

  ngAfterViewInit(): void {
    this.showMonthlyDropdown;
    this.YearlyDataSource.paginator = this.YearlyPaginator;
    this.HalfYearlyDataSource.paginator = this.MonthlyPaginator;
    this.QuarterlyDataSource.paginator = this.HalfYearlyPaginator;
    this.MonthlyDataSource.paginator = this.QuarterlyPaginator;
  }

  ngOnInit(): void {
    this.getProjects();
    this.getFinancialYear();
  }

  getProjects(){
    this.accountService.GetAllProjects().subscribe({
      next: (data) => {
        this.ProjectsList = [...data]
        data.forEach((items)=>{
          if(items.projectName){
           const splitAccount = items.projectName.split("|");
           if(splitAccount.length >0){
            //  items.projectName= splitAccount[0];
           }
          }
         });
        this.ProjectsList=this.filteredAccount=data;
         
        // this.SelectedProjectName = this.ProjectsList.map(option => option.projectId);
        // console.log(this.SelectedProjectName)
      },
      error: (error: any) => {
      }
      
    });

  }

  getFinancialYear() {
    this.yearService.getYearsTab(this.tabSelected).subscribe((data) => {
      this.Years = data;
      if (!this.selectedYear.includes(this.Years[this.Years.length - 1])) {
        this.selectedYear.push(
          this.Years[this.Years.length - 1],
          this.Years[this.Years.length - 2]
        );
      }
      this.selectedTab('');
    });
  }
  toggleFilterVisibility() {
    try {
      const dialogRef = this.dialog.open(SalesReportFilterComponent, {
        width: '380px',
        height: 'max-content',
        data: {
          accountList: this.ProjectsList,
          yearsList: this.Years,
          selectedYear: this.selectedYear,
          selectedMonth: this.selectedMonth,
          selectedQuarter: this.selectedQuarter,
          selectedHalfYearly: this.selectedHalfYearly,
          showMonthlyDropdown: this.showMonthlyDropdown,
          showQurterlyDropdown: this.showQurterlyDropdown,
          showHalfYearlyDropdown: this.showHalfYearlyDropdown,
          tabSelected: this.tabSelected,
          SelectedAccountName: this.SelectedProjectName,
          title: 'Filter Details',
          ProjectDropDown:true
        },
      });
      dialogRef.afterClosed().subscribe({
        next: (data) => {
          if (data) {
            this.selectedYear = data.selectedYear;
            (this.selectedMonth = data.selectedMonth),
              (this.selectedQuarter = data.selectedQuarter),
              (this.selectedHalfYearly = data.selectedHalfYearly),
              (this.SelectedProjectName = data.SelectedAccountName);
            this.onSelectionChange();
          }
        },
      });
    } catch (err) {
      //this.openValidationPopup(err, 'Error in Opening Role Dialogue Box !');
    }
  }

  loadQuaterlyData(): Promise<void> {
    return new Promise((resolve) => {
      const projectIdArray = this.getProjectIdArray(
        this.ProjectsList,
        this.SelectedProjectName
      );
      const salesObj = this.createSalesObj(
        projectIdArray,
        this.selectedYear,
        this.selectedQuarter,
        'Quaterly'
      );
      if (salesObj.years.length == 0 || salesObj.reportType == undefined) {
        return;
      }

      const serviceEndpoint = 'SalesGuidance/GetProjectReports';
      this.salesReportService
        .AddSalesReportDetails(serviceEndpoint, salesObj)
        .subscribe({
          next: (res: any) => {
            this.quterlyData = this.processSalesData(res);
            resolve();
          },
        });
    });
  }

  loadYearlyData(): Promise<void> {
    return new Promise((resolve) => {
      const projecttIdArray = this.getProjectIdArray(
        this.ProjectsList,
        this.SelectedProjectName
      );
      const salesObj = this.createSalesObj(
        projecttIdArray,
        this.selectedYear,
        [''],
        'Yearly'
      );
      if (salesObj.years.length == 0 || salesObj.reportType == undefined) {
        return;
      }

      const serviceEndpoint = 'SalesGuidance/GetProjectReports';
      this.salesReportService
        .AddSalesReportDetails(serviceEndpoint, salesObj)
        .subscribe({
          next: (res: any) => {
            this.yearlyData = this.processSalesData(res);
            resolve();
          },
        });
    });
  }

  loadMonthlyData(): Promise<void> {
    return new Promise((resolve) => {
      const projecttIdArray = this.getProjectIdArray(
        this.ProjectsList,
        this.SelectedProjectName
      );
      const salesObj = this.createSalesObj(
        projecttIdArray,
        this.selectedYear,
        this.selectedMonth,
        'Monthly'
      );
      if (salesObj.years.length == 0 || salesObj.reportType == undefined) {
        return;
      }
      const serviceEndpoint = 'SalesGuidance/GetProjectReports';
      this.salesReportService
        .AddSalesReportDetails(serviceEndpoint, salesObj)
        .subscribe({
          next: (res: any) => {
            this.monthlyData = this.processSalesData(res);
            resolve();
          },
        });
    });
  }

  loadHalfYearlyData(): Promise<void> {
    return new Promise((resolve) => {
      const projecttIdArray = this.getProjectIdArray(
        this.ProjectsList,
        this.SelectedProjectName
      );
      const salesObj = this.createSalesObj(
        projecttIdArray,
        this.selectedYear,
        this.selectedHalfYearly,
        'HalfYearly'
      );
      if (salesObj.years.length == 0 || salesObj.reportType == undefined) {
        return;
      }
      const serviceEndpoint = 'SalesGuidance/GetProjectReports';
      this.salesReportService
        .AddSalesReportDetails(serviceEndpoint, salesObj)
        .subscribe({
          next: (res: any) => {
            this.halfYearlyData = this.processSalesData(res);
            resolve();
          },
        });
    });
  }

  selectedTab(event: any) {
    const tab = (this.selectedTabName = event?.tab?.textLabel || 'Monthly');
    this.showMonthlyDropdown = true;
    this.showQurterlyDropdown = false;
    this.showHalfYearlyDropdown = false;

    if (
      tab === 'HalfYearly' ||
      tab === 'Quaterly' ||
      tab === 'Monthly' ||
      tab === 'Yearly'
    ) {
      this.showMonthlyDropdown = false;
    }

    if (tab === 'Yearly') {
      this.tabSelected = 'Yearly';
    }

    if (tab === 'HalfYearly') {
      this.showHalfYearlyDropdown = true;
      this.tabSelected = 'HalfYearly';
    } else if (tab === 'Quaterly') {
      this.showQurterlyDropdown = true;
      this.tabSelected = 'Quaterly';
    } else if (tab === 'Monthly') {
      this.showMonthlyDropdown = true;
      this.tabSelected = 'Monthly';
    }
    this.onSelectionChange();
  }

  isSticky(column: string): boolean {
    return column === 'Account'
      ? true
      : false || column === 'Account Manager'
        ? true
        : false;
  }

  onSelectionChange() {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }

    let tabBaseCriteriaValue: any;
    if (this.showMonthlyDropdown) {
      tabBaseCriteriaValue = this.selectedMonth;
    } else if (this.showQurterlyDropdown) {
      tabBaseCriteriaValue = this.selectedQuarter;
    } else if (this.showHalfYearlyDropdown) {
      tabBaseCriteriaValue = this.selectedHalfYearly;
    } else {
      tabBaseCriteriaValue = [''];
    }
    const projecttIdArray = [];
    if (
      this.ProjectsList.length != 0 &&
      this.SelectedProjectName != undefined
    ) {
      this.ProjectsList.forEach((items) => {
        this.SelectedProjectName.forEach((selectedAccount: any) => {
          if (items.projectId === selectedAccount) {
            projecttIdArray.push(items.projectId);
          }
        });
      });
    }

    let salesObj = {
      ProjectsIds: projecttIdArray,      
      years: this.selectedYear,
      tabBaseCriteria: tabBaseCriteriaValue,
      reportType: this.selectedTabName,
    };
    if (salesObj.years.length == 0 || salesObj.reportType == undefined) {
      return;
    }

    const serviceEndpoint = 'SalesGuidance/GetProjectReports';
    this.isLoaded = true;
    this.apiSubscription = this.salesReportService
      .AddSalesReportDetails(serviceEndpoint, salesObj)
      .subscribe({
        next: (res: any) => {
          this.displayedMonthlyCol = [];
          this.displayedQuarterlyCol = [];
          this.displayedYearlyCol = [];
          this.displayedHalfYearlyCol = [];
          let columnHeader = [];
          const labelYearColumnHeader: string[] = [];

          if (res.salesGuidanceMonthlyReportDtos.length > 0) {
            columnHeader = Object.keys(
              res.salesGuidanceMonthlyReportDtos[0]
            ).filter(
              (key) =>
                key !== 'guidanceDetails' &&
                key !== 'accountId' &&
                key !== 'location' &&
                key !== 'customerBDM'
                && key !== 'igName' && key !== 'igHead'
               && key !== 'geoLocation' && key !== 'headCount' && key !== 'customerGroup'
            );

            res.salesGuidanceMonthlyReportDtos[0].guidanceDetails.forEach(
              (detail) => {
                labelYearColumnHeader.push(detail.label + ' ' + detail.yearLabel);
              }
            );
          }

          const mergedColumn = [...columnHeader.concat(labelYearColumnHeader)];

          this.displayedMonthlyCol = mergedColumn.map((column) => {
            if (column === 'accountName') {
              return 'Account';
            } else if (column === 'accountManager') {
              return 'Account Manager';
            } else if (column === 'customerGroup') {
              return 'Customer Group';
            }else if (column === 'projectName') {
              return 'Project Name';
            }  else {
              return column;
            }
          });

          this.displayedQuarterlyCol = mergedColumn.map((column) => {
            if (column === 'accountName') {
              return 'Account';
            } else if (column === 'accountManager') {
              return 'Account Manager';
            }else if (column === 'projectName') {
              return 'Project Name';
            } else {
              return column;
            }
          });

          this.displayedYearlyCol = mergedColumn.map((column) => {
            if (column === 'accountName') {
              return 'Account';
            } else if (column === 'accountManager') {
              return 'Account Manager';
            }else if (column === 'projectName') {
              return 'Project Name';
            } else {
              return column;
            }
          });

          this.displayedHalfYearlyCol = mergedColumn.map((column) => {
            if (column === 'accountName') {
              return 'Account';
            } else if (column === 'accountManager') {
              return 'Account Manager';
            }else if (column === 'projectName') {
              return 'Project Name';
            } else {
              return column;
            }
          });

          const fetchTableData = res.salesGuidanceMonthlyReportDtos.map(
            (item) => {
              const updatedItem: any = {};
              Object.keys(item).forEach((key) => {
                if (key !== 'guidanceDetails') {
                  if (key === 'accountName') {
                    updatedItem['Account'] = item[key];
                  } else if (key === 'accountManager') {
                    updatedItem['Account Manager'] = item[key];
                  }else if (key === 'projectName') {
                    updatedItem['Project Name'] = item[key];
                  }  else {
                    updatedItem[key] = item[key];
                  }
                } else {
                  item[key].forEach((detail) => {
                    updatedItem[`${detail.label} ${detail.yearLabel}`] =
                      detail.value;
                  });
                }
              });
              return updatedItem;
            }
          );

          if (this.showMonthlyDropdown) {
            // this.displayedMonthlyCol = displayedMonthlyCol
            this.MonthlyDataSource = new MatTableDataSource<any>(
              fetchTableData
            );
            this.monthlyData = this.MonthlyDataSource.data;
            this.MonthlyDataSource.paginator = this.MonthlyPaginator;
          } else if (this.showQurterlyDropdown) {
            // this.displayedQuarterlyCol = displayedQuarterlyCol
            this.QuarterlyDataSource = new MatTableDataSource<any>(
              fetchTableData
            );
            this.quterlyData = this.QuarterlyDataSource.data;
            this.QuarterlyDataSource.paginator = this.QuarterlyPaginator;
          } else if (this.showHalfYearlyDropdown) {
            //this.displayedHalfYearlyCol = displayedHalfYearlyCol
            this.HalfYearlyDataSource = new MatTableDataSource<any>(
              fetchTableData
            );
            this.halfYearlyData = this.HalfYearlyDataSource.data;
            this.HalfYearlyDataSource.paginator = this.HalfYearlyPaginator;
          } else {
            //  this.displayedYearlyCol = displayedYearlyCol
            this.YearlyDataSource = new MatTableDataSource<any>(fetchTableData);
            this.yearlyData = this.YearlyDataSource.data;
            this.YearlyDataSource.paginator = this.YearlyPaginator;
          }

          this.isLoaded = false;
        },
      });
  }

  exportToExcel(): void {
    const workbook = XLSX.utils.book_new();

    const monthlyDataPromise =
      this.monthlyData === null || this.monthlyData === undefined
        ? this.loadMonthlyData().then(() => this.processMonthlyData())
        : Promise.resolve(this.processMonthlyData());

    const yearlyDataPromise =
      this.yearlyData === null || this.yearlyData === undefined
        ? this.loadYearlyData().then(() => this.processYearlyData())
        : Promise.resolve(this.processYearlyData());

    const halfYearlyDataPromise =
      this.halfYearlyData === null || this.halfYearlyData === undefined
        ? this.loadHalfYearlyData().then(() => this.processHalfYearlyData())
        : Promise.resolve(this.processHalfYearlyData());

    const quaterlyDataPromise =
      this.quterlyData === null || this.quterlyData === undefined
        ? this.loadQuaterlyData().then(() => this.processQuterlyData())
        : Promise.resolve(this.processQuterlyData());

    Promise.all([
      monthlyDataPromise,
      yearlyDataPromise,
      halfYearlyDataPromise,
      quaterlyDataPromise,
    ]).then(() => {
      this.exportToExcelAfterDataLoad(workbook);
    });
  }
  exportToExcelAfterDataLoad(workbook: any): void {
    const monthlyDataToExport = this.monthlyData;
    const monthlyDataSheet = XLSX.utils.json_to_sheet(monthlyDataToExport);
    XLSX.utils.book_append_sheet(workbook, monthlyDataSheet, 'Month data');

    const quaterlyDataToExport = this.quterlyData;
    const quaterlyDataSheet = XLSX.utils.json_to_sheet(quaterlyDataToExport);
    XLSX.utils.book_append_sheet(workbook, quaterlyDataSheet, 'Quarter data');

    const halfYearlyDataToExport = this.halfYearlyData;
    const halfYearlyDataSheet = XLSX.utils.json_to_sheet(
      halfYearlyDataToExport
    );
    XLSX.utils.book_append_sheet(
      workbook,
      halfYearlyDataSheet,
      'Half Year data'
    );

    const yearlyDataToExport = this.yearlyData;
    const yearlyDataSheet = XLSX.utils.json_to_sheet(yearlyDataToExport);
    XLSX.utils.book_append_sheet(workbook, yearlyDataSheet, 'Year data');

    XLSX.writeFile(workbook, 'sales_report.xlsx');
  }

  processMonthlyData(): void {
    this.monthlyData.forEach((items) => {
      if (items.Account) {
        const splitAccount = items.Account.split('|');
        if (splitAccount.length > 0) {
          items.Account = splitAccount[0];
        }
        delete items.location, delete items.customerBDM, delete items.accountId,
        delete items.igHead,delete items.igName,delete items.customerGroup,delete items.customerBDM,
        delete items.geoLocation,delete items.headCount;
      }
    });
  }
  processHalfYearlyData(): void {
    this.halfYearlyData.forEach((items) => {
      if (items.Account) {
        const splitAccount = items.Account.split('|');
        if (splitAccount.length > 0) {
          items.Account = splitAccount[0];
        }
        delete items.location, delete items.customerBDM, delete items.accountId,
        delete items.igHead,delete items.igName,delete items.customerGroup,delete items.customerBDM,
        delete items.geoLocation,delete items.headCount;
      }
    });
  }
  processQuterlyData(): void {
    this.quterlyData.forEach((items) => {
      if (items.Account) {
        const splitAccount = items.Account.split('|');
        if (splitAccount.length > 0) {
          items.Account = splitAccount[0];
        }
        delete items.location, delete items.customerBDM, delete items.accountId,
        delete items.igHead,delete items.igName,delete items.customerGroup,delete items.customerBDM,
        delete items.geoLocation,delete items.headCount;
      }
    });
  }
  processYearlyData(): void {
    this.yearlyData.forEach((items) => {
      if (items.Account) {
        const splitAccount = items.Account.split('|');
        if (splitAccount.length > 0) {
          items.Account = splitAccount[0];
        }
        delete items.location,delete items.customerBDM,delete items.accountId,
        delete items.igHead,delete items.igName,delete items.customerGroup,delete items.customerBDM,
        delete items.geoLocation,delete items.headCount;
      }
    });
  }
  createSalesObj(
    projectIdArray: any[],
    selectedYear: any[],
    tabBaseCriteria: any[],
    reportType: string
  ): any {
    return {
      ProjectsIds: projectIdArray,
      years: selectedYear,
      tabBaseCriteria: tabBaseCriteria,
      reportType: reportType,
    };
  }
  getProjectIdArray(accountsList: any[], selectedAccountName: any[]): any[] {
    const projecttIdArray = [];
    if (accountsList.length != 0 && selectedAccountName != undefined) {
      accountsList.forEach((items) => {
        selectedAccountName.forEach((selectedAccount: any) => {
          if (items.projectId === selectedAccount) {
            projecttIdArray.push(items.projectId);
          }
        });
      });
    }
    return projecttIdArray;
  }

  processSalesData(res: any): any[] {
    let columnHeader = [];
    const labelYearColumnHeader: string[] = [];

    if (res.salesGuidanceMonthlyReportDtos.length > 0) {
      columnHeader = Object.keys(res.salesGuidanceMonthlyReportDtos[0]).filter(
        (key) =>
          key !== 'guidanceDetails' &&
          key !== 'accountId' && key !== 'location' &&
          key !== 'customerBDM'&& key !== 'igName' && key !== 'igHead'&& 
          key !== 'geoLocation' && key !== 'headCount'
      );

      res.salesGuidanceMonthlyReportDtos[0].guidanceDetails.forEach(
        (detail) => {
          labelYearColumnHeader.push(detail.label + ' ' + detail.yearLabel);
        }
      );
    }

    return res.salesGuidanceMonthlyReportDtos.map((item) => {
      const updatedItem: any = {};
      Object.keys(item).forEach((key) => {
        if (key !== 'guidanceDetails') {
          if (key === 'accountName') {
            updatedItem['Account'] = item[key];
          } else if (key === 'accountManager') {
            updatedItem['Account Manager'] = item[key];
          } else {
            updatedItem[key] = item[key];
          }
        } else {
          item[key].forEach((detail) => {
            updatedItem[`${detail.label} ${detail.yearLabel}`] = detail.value;
          });
        }
      });
      return updatedItem;
    });
  }
}
