import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  selector: 'app-sales-account-headcount-revenue-report',
  templateUrl: './sales-account-headcount-revenue-report.component.html',
  styleUrls: ['./sales-account-headcount-revenue-report.component.scss']
})
export class SalesAccountHeadcountRevenueReportComponent {
  AccountsList: any[] = [];
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
    this.getAccounts();
    this.getFinancialYear();
  }

  getAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => {
        data.forEach((items) => {
          if (items.customerGroup) {
            //const splitAccount = items.customerName.split("|");
          }
        });
        this.AccountsList = this.filteredAccount = Object.values(
          data.reduce((acc, customer) => {
            acc[customer.customerGroup] =
              acc[customer.customerGroup] || customer;
            return acc;
          }, {})
        );
      },
      error: () => { },
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
          accountList: this.AccountsList,
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
          AccountDropdown:true
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


  loadMonthlyData(): Promise<void> {
    return new Promise((resolve) => {
      const accountIdArray = this.getAccountIdArray(
        this.AccountsList,
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
      const serviceEndpoint = 'SalesGuidance/GetAccountWiseHeadCountRevenueReports';
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
      this.AccountsList.length != 0 &&
      this.SelectedAccountName != undefined
    ) {
      this.AccountsList.forEach((items) => {
        this.SelectedAccountName.forEach((selectedAccount: any) => {
          if (items.customerGroup === selectedAccount) {
            accountIdArray.push(items.customerGroup);
          }
        });
      });
    }

    let salesObj = {
      CustomerGroup: accountIdArray,
      years: this.selectedYear,
      tabBaseCriteria: tabBaseCriteriaValue,
      reportType: this.selectedTabName,
    };
    if (salesObj.years.length == 0 || salesObj.reportType == undefined) {
      return;
    }

    const serviceEndpoint = 'SalesGuidance/GetAccountWiseHeadCountRevenueReports';
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
                && key !== 'projectName' && key !== 'geoLocation' && key !== 'headCount' && key !== 'customerGroup'
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
            } else {
              return column;
            }
          });

          this.displayedQuarterlyCol = mergedColumn.map((column) => {
            if (column === 'accountName') {
              return 'Account';
            } else if (column === 'accountManager') {
              return 'Account Manager';
            } else {
              return column;
            }
          });

          this.displayedYearlyCol = mergedColumn.map((column) => {
            if (column === 'accountName') {
              return 'Account';
            } else if (column === 'accountManager') {
              return 'Account Manager';
            } else {
              return column;
            }
          });

          this.displayedHalfYearlyCol = mergedColumn.map((column) => {
            if (column === 'accountName') {
              return 'Account';
            } else if (column === 'accountManager') {
              return 'Account Manager';
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
                  } else {
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


    Promise.all([
      monthlyDataPromise,
    ]).then(() => {
      this.exportToExcelAfterDataLoad(workbook);
    });
  }
  exportToExcelAfterDataLoad(workbook: any): void {
    const monthlyDataToExport = this.monthlyData;
    const monthlyDataSheet = XLSX.utils.json_to_sheet(monthlyDataToExport);
    XLSX.utils.book_append_sheet(workbook, monthlyDataSheet, 'Month data');

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
        delete items.geoLocation,delete items.headCount,delete items.projectName;
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
      CustomerGroup: accountIdArray,
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
          if (items.customerGroup === selectedAccount) {
            accountIdArray.push(items.customerGroup);
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
          key !== 'location' &&
          key !== 'customerBDM'&&
          key !== 'igName' && key !== 'igHead'&& 
          key !== 'projectName' && key !== 'geoLocation' && 
          key !== 'headCount' && key !== 'customerGroup'
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
