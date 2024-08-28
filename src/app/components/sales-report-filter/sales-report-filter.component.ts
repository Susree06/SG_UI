import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { MatOption, MatOptionSelectionChange } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-sales-report-filter',
  templateUrl: './sales-report-filter.component.html',
  styleUrls: ['./sales-report-filter.component.scss']
})
export class SalesReportFilterComponent implements OnInit {
  options: { Label: string; Value: number }[] = [];
  searchCtrlAccount = new FormControl('');
  filteredAccountOptions!: Observable<any[]> | undefined;
  AccountsList: any[] = [];
  FinancialYearList: any;
  MonthList: any;
  selectedTabName: any;
  selection = new SelectionModel<any>(true, []);
  tabSelected: string;
  accountForm!: FormGroup;
  selectedAccount: any;
  selectedYear: any[] = [];
  selectedMonth: any[] = ['Jan', 'Feb', 'Mar'];
  selectedQuarter: any[] = ['Q1'];
  selectedHalfYearly: any[] = ['H1'];
  filteredAccount: any[] = [];
  SelectedAccountName: any;
  FinancialYear = [];
  Years: any[] = [];
  Months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  quarters: any[] = ['Q1', 'Q2', 'Q3', 'Q4'];
  halfYear: any[] = ['H1', 'H2'];
  showMonthlyDropdown: boolean = true;
  showQurterlyDropdown: boolean = true;
  showHalfYearlyDropdown: boolean = true;
  title: string;
  SalesDropDown:false
  IGDropdown:false;
  AccountDropdown:false;
  ProjectDropDown:false;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<SalesReportFilterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog
  ) {
    this.title = data.title;
    this.AccountsList = data.accountList;
    this.Years = data.yearsList;
    this.selectedYear = data.selectedYear;
    (this.selectedMonth = data.selectedMonth),
      (this.selectedQuarter = data.selectedQuarter),
      (this.selectedHalfYearly = data.selectedHalfYearly),
      (this.showMonthlyDropdown = data.showMonthlyDropdown),
      (this.showQurterlyDropdown = data.showQurterlyDropdown),
      (this.showHalfYearlyDropdown = data.showHalfYearlyDropdown),
      (this.tabSelected = data.tabSelected),
      (this.SelectedAccountName = data.SelectedAccountName),
      (this.IGDropdown=data.IGDropdown),
      (this.AccountDropdown=data.AccountDropdown),
      (this.ProjectDropDown=data.ProjectDropDown),
      (this.SalesDropDown=data.SalesDropDown);
    this.accountForm = this._fb.group({
      accountId: [{ value: '' }],
    });

    if(this.AccountDropdown){
      data.accountList.forEach(item => {
        this.options.push({
          Label: item.customerGroup,
          Value: item.customerGroup
        });
      });
    }
    if(this.IGDropdown){
      data.accountList.forEach(item => {
        this.options.push({
          Label: item.igName,
          Value: item.igId
        });
      });
    }
    if(this.ProjectDropDown){
      data.accountList.forEach(item => {
        this.options.push({
          Label: item.projectName,
          Value: item.projectId
        });
      });
    }
  
  }

  ngOnInit(): void {
    this.accountForm.get('accountId')?.setValue(this.SelectedAccountName);
    this.filteredAccountOptions = this.searchCtrlAccount.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : '';
        return name
          ? this.accountFilter(name as string)
          : this.AccountsList.slice();
      })
    );
  }
  isSelectionDisabled(selectionType: string, value: any): boolean {
    const maxAllowedYears = 4;
    const maxAllowedYearsOtherTabs = 2;
    if (
      selectionType === 'FinancialYear' &&
      this.selectedTabName === 'Yearly'
    ) {
      return (
        this.selectedYear.length >= maxAllowedYears &&
        !this.selectedYear.includes(value)
      );
    } else if (selectionType === 'FinancialYear') {
      return (
        this.selectedYear.length >= maxAllowedYearsOtherTabs &&
        !this.selectedYear.includes(value)
      );
    }
    return false;
  }

  onAccountSelectionChange(a: MatOptionSelectionChange) {
    
     
    let values: string[] =
      this.accountForm?.value.accountId || ([] as string[]);
    if (a.isUserInput) {
      if (a.source.selected && !values.includes(a.source.value)) {
        values.push(a.source.value);
      } else if (!a.source.selected && values.includes(a.source.value)) {
        values = values.filter((value) => value !== a.source.value);
      }
      this.accountForm.get('accountId')?.setValue(values);
    }
    this.SelectedAccountName = [...values];
    // console.log(this.SelectedAccountName)
    // this.SelectedAccountName = [
    //   ...a.source.value.map((b: { customerGroup: any; }) => b.customerGroup),
    // ];
  }

  private accountFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.AccountsList.filter((option: { customerGroup: string }) =>
      option.customerGroup.toLowerCase().includes(filterValue)
    );
  }

  selected(e: MatSelect): 'some' | 'all' | undefined {
    if (e.options == null || e.options.length === 0) {
      return undefined;
    } else if (e._selectionModel.selected.length === e.options.length) {
      return 'all';
    } else if (
      e._selectionModel.selected.length > 0 &&
      e._selectionModel.selected.length < e.options.length
    ) {
      return 'some';
    } else {
      return undefined;
    }
  }

  toggleSelection(e: any) {
    let values: string[] =
      this.accountForm?.value.accountId || ([] as string[]);
    e.options.forEach((item: MatOption) => {
      if (this.selected(e) !== 'all' && !values.includes(item.value)) {
        values.push(item.value);
      } else if (this.selected(e) === 'all' && values?.includes(item.value)) {
        values = values.filter((value) => value !== item.value);
      }
    });
    this.SelectedAccountName = [...values];
    // this.accountForm.controls['accountId'].setValue(this.SelectedAccountName);
    this.accountForm.get('accountId')?.setValue(values);
  }

  toggleSelection1(e: any) {  
    this.SelectedAccountName = [...e];
  }

  applyFilter() {
    const filterData = {
      selectedYear: this.selectedYear,
      selectedMonth: this.selectedMonth,
      selectedQuarter: this.selectedQuarter,
      selectedHalfYearly: this.selectedHalfYearly,
      SelectedAccountName: this.SelectedAccountName,
    };
    this.dialogRef.close(filterData);
  }
}

