import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { SalesReportService } from 'src/app/core/services/sales-report.service';
import { YearsServices } from 'src/app/core/services/years.services';
import * as XLSX from 'xlsx';
import { SalesReportFilterComponent } from '../sales-report-filter/sales-report-filter.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sales-account-ig-revenue-report',
  templateUrl: './sales-account-ig-revenue-report.component.html',
  styleUrls: ['./sales-account-ig-revenue-report.component.scss']
})
export class SalesAccountIGRevenueReportComponent {
  AccountsList: any[] = [];
  IGList: any[]=[];
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
  SelectedAccountName: any;
  Years: any[] = [];
  showMonthlyDropdown: boolean = true;
  showQurterlyDropdown: boolean = true;
  showHalfYearlyDropdown: boolean = true;

  constructor(
    public dialog: MatDialog,
    private yearService: YearsServices,
    private salesReportService: SalesReportService,
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
    this.getIndustryGroups();
    this.getFinancialYear();
  }

  getIndustryGroups(){
    this.accountService.GetAllIndustryGroups().subscribe({
      next: (data) => {
        data.forEach((items)=>{
          if(items.iGName){
           const splitAccount = items.iGName.split("|");
           if(splitAccount.length >0){
            //  items.projectName= splitAccount[0];
           }
          }
         });
        this.IGList=this.filteredAccount=data;
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
          accountList: this.IGList,
          yearsList: this.Years,
          selectedYear: this.selectedYear,
          selectedMonth: this.selectedMonth,
          selectedQuarter: this.selectedQuarter,
          selectedHalfYearly: this.selectedHalfYearly,
          showMonthlyDropdown: this.showMonthlyDropdown,
          showQurterlyDropdown: this.showQurterlyDropdown,
          showHalfYearlyDropdown: this.showHalfYearlyDropdown,
          tabSelected: this.tabSelected,
          SelectedAccountName: this.SelectedAccountName,
          title: 'Filter Details',
          IGDropdown:true
        },
      });
      dialogRef.afterClosed().subscribe({
        next: (data) => {
          if (data) {
            this.selectedYear = data.selectedYear;
            (this.selectedMonth = data.selectedMonth),
              (this.selectedQuarter = data.selectedQuarter),
              (this.selectedHalfYearly = data.selectedHalfYearly),
              (this.SelectedAccountName = data.SelectedAccountName);
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
      const accountIdArray = this.getAccountIdArray(
        this.IGList,
        this.SelectedAccountName
      );
      const salesObj = this.createSalesObj(
        accountIdArray,
        this.selectedYear,
        this.selectedQuarter,
        'Quaterly'
      );
      if (salesObj.years.length == 0 || salesObj.reportType == undefined) {
        return;
      }

      const serviceEndpoint = 'SalesGuidance/GetIGRevenueReports';
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
      const accountIdArray = this.getAccountIdArray(
        this.IGList,
        this.SelectedAccountName
      );
      const salesObj = this.createSalesObj(
        accountIdArray,
        this.selectedYear,
        [''],
        'Yearly'
      );
      if (salesObj.years.length == 0 || salesObj.reportType == undefined) {
        return;
      }

      const serviceEndpoint = 'SalesGuidance/GetIGRevenueReports';
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
      const accountIdArray = this.getAccountIdArray(
        this.IGList,
        this.SelectedAccountName
      );
      const salesObj = this.createSalesObj(
        accountIdArray,
        this.selectedYear,
        this.selectedMonth,
        'Monthly'
      );
      if (salesObj.years.length == 0 || salesObj.reportType == undefined) {
        return;
      }
      const serviceEndpoint = 'SalesGuidance/GetIGRevenueReports';
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
      const accountIdArray = this.getAccountIdArray(
        this.IGList,
        this.SelectedAccountName
      );
      const salesObj = this.createSalesObj(
        accountIdArray,
        this.selectedYear,
        this.selectedHalfYearly,
        'HalfYearly'
      );
      if (salesObj.years.length == 0 || salesObj.reportType == undefined) {
        return;
      }
      const serviceEndpoint = 'SalesGuidance/GetIGRevenueReports';
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
    const accountIdArray = [];
    if (
      this.IGList.length != 0 &&
      this.SelectedAccountName != undefined
    ) {
      this.IGList.forEach((items) => {
        this.SelectedAccountName.forEach((selectedAccount: any) => {
          if (items.igId === selectedAccount) {
            accountIdArray.push(items.igId);
          }
        });
      });
    }

    let salesObj = {
      // CustomerGroup: accountIdArray,
      IGIds:accountIdArray,
      years: this.selectedYear,
      tabBaseCriteria: tabBaseCriteriaValue,
      reportType: this.selectedTabName,
    };
    if (salesObj.years.length == 0 || salesObj.reportType == undefined) {
      return;
    }

    const serviceEndpoint = 'SalesGuidance/GetIGRevenueReports';
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
                key !== 'account' &&
                key !== 'location' &&
                key !== 'customerBDM'
                && key !== 'projectName' && key !== 'headCount' 
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
            }else if (column === 'igName') {
              return 'IG Name';
            }else if (column === 'customerGroup') {
              return 'Customer Group';
            }
            else if (column === 'igHead') {
              return 'IG Head';
            }else if (column === 'geoLocation') {
              return 'Geo Location';
            }
             else {
              return column;
            }
          });

          this.displayedQuarterlyCol = mergedColumn.map((column) => {
            if (column === 'accountName') {
              return 'Account';
            } else if (column === 'accountManager') {
              return 'Account Manager';
            }else if (column === 'igName') {
              return 'IG Name';
            }else if (column === 'customerGroup') {
              return 'Customer Group';
            }
            else if (column === 'igHead') {
              return 'IG Head';
            }else if (column === 'geoLocation') {
              return 'Geo Location';
            } else {
              return column;
            }
          });

          this.displayedYearlyCol = mergedColumn.map((column) => {
            if (column === 'accountName') {
              return 'Account';
            } else if (column === 'accountManager') {
              return 'Account Manager';
            }else if (column === 'igName') {
              return 'IG Name';
            }else if (column === 'customerGroup') {
              return 'Customer Group';
            }
            else if (column === 'igHead') {
              return 'IG Head';
            }else if (column === 'geoLocation') {
              return 'Geo Location';
            } else {
              return column;
            }
          });

          this.displayedHalfYearlyCol = mergedColumn.map((column) => {
            if (column === 'accountName') {
              return 'Account';
            } else if (column === 'accountManager') {
              return 'Account Manager';
            }else if (column === 'igName') {
              return 'IG Name';
            }else if (column === 'customerGroup') {
              return 'Customer Group';
            }
            else if (column === 'igHead') {
              return 'IG Head';
            }else if (column === 'geoLocation') {
              return 'Geo Location';
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
                  }else if (key === 'igName') {
                    updatedItem['IG Name'] = item[key];
                  }else if (key === 'customerGroup') {
                    updatedItem['Customer Group'] = item[key];
                  }
                  else if (key === 'igHead') {
                    updatedItem['IG Head'] = item[key];
                  } else if (key === 'geoLocation') {
                    updatedItem['Geo Location'] = item[key];
                  } 
                  else {
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
        delete items.customerGroup,delete items.customerBDM,delete items.headCount,delete items.projectName;
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
        delete items.customerGroup,delete items.customerBDM,delete items.headCount,delete items.projectName;
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
        delete items.customerGroup,delete items.customerBDM,delete items.headCount,delete items.projectName;
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
        delete items.customerGroup,delete items.customerBDM,delete items.headCount,delete items.projectName;
      }
    });
  }
  createSalesObj(
    accountIdArray: any[],
    selectedYear: any[],
    tabBaseCriteria: any[],
    reportType: string
  ): any {
    return {
      // CustomerGroup: accountIdArray,
      IGIds:accountIdArray,
      years: selectedYear,
      tabBaseCriteria: tabBaseCriteria,
      reportType: reportType,
    };
  }
  getAccountIdArray(accountsList: any[], selectedAccountName: any[]): any[] {
    const accountIdArray = [];
    if (accountsList.length != 0 && selectedAccountName != undefined) {
      accountsList.forEach((items) => {
        selectedAccountName.forEach((selectedAccount: any) => {
          if (items.igId === selectedAccount) {
            accountIdArray.push(items.igId);
          }
        });
      });
    }
    return accountIdArray;
  }

  processSalesData(res: any): any[] {
    let columnHeader = [];
    const labelYearColumnHeader: string[] = [];

    if (res.salesGuidanceMonthlyReportDtos.length > 0) {
      columnHeader = Object.keys(res.salesGuidanceMonthlyReportDtos[0]).filter(
        (key) =>
          key !== 'guidanceDetails' &&
          key !== 'accountId' &&
          key !== 'account' &&
          key !== 'location' &&
          key !== 'customerBDM'&&
          key !== 'igName' && key !== 'igHead'&& 
          key !== 'projectName' && key !== 'geoLocation' && 
          key !== 'headCount' 
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
          }else if (key === 'igName') {
            updatedItem['IG Name'] = item[key];
          }else if (key === 'customerGroup') {
            updatedItem['Customer Group'] = item[key];
          }
           else {
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
