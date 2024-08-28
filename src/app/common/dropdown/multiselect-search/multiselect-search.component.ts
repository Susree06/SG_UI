import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { MatOption, MatOptionSelectionChange } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-multiselect-search',
  templateUrl: './multiselect-search.component.html',
  styleUrls: ['./multiselect-search.component.scss']
})
export class MultiselectSearchComponent implements OnInit{

  searchCtrlAccount = new FormControl('');
  filteredDropdownOptions!: Observable<any[]> | undefined;

  @Input()SelectedDropDownName: any;

  accountForm!: FormGroup;
  selectedYear: any[] = [];
  selectedAccount: any;
  titleLabel: any;
  @Input() Label :string="Account";
  @Input() options: any;
  @Output() selectionChange =new EventEmitter<any>();
  @Output() change =new EventEmitter<any>();
  @Output() onSelectionChange =new EventEmitter<MatOptionSelectionChange>();
  @Output() onChange =new EventEmitter<any>();
  @Output() onChange1 =new EventEmitter<any>();
  

  constructor(private _fb: FormBuilder,){
    this.accountForm = this._fb.group({
      accountId: [{ value: '' }],
    });
  }

  ngOnInit(): void {
    this.accountForm.get('accountId')?.setValue(this.SelectedDropDownName);
    this.filteredDropdownOptions = this.searchCtrlAccount.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : '';
        return name
          ? this.dropDownFilter(name as string)
          : this.options.slice();
      })
    );

  }

  private dropDownFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.options.filter((option: { Label: string }) =>
      option.Label.toLowerCase().includes(filterValue)
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
    this.SelectedDropDownName = [...values];
    this.selectedAccount = [...values];
    
    this.onSelectionChange.emit(a);
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
    this.SelectedDropDownName = [...values];
    this.accountForm.get('accountId')?.setValue(values);
    this.change.emit(e);
    this.onChange1.emit(this.SelectedDropDownName);
    
  }

}
