import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AccountDetails } from 'src/app/core/models/account-wise-configuration.model';
import { UsersDto } from 'src/app/core/models/user-config.model';
import { UserConfigService } from 'src/app/core/services/user-config.service';
import { SuccessPopupComponent } from '../../my-dashboard/success-popup/success-popup.component';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Observable, map, startWith } from 'rxjs';
import { MatSelect } from '@angular/material/select';
@Component({
  selector: 'app-user-config-details',
  templateUrl: './user-config-details.component.html',
  styleUrls: ['./user-config-details.component.scss'],
})
export class UserConfigDetailsComponent implements OnInit, AfterViewInit {
  accountsList!: AccountDetails[];
  usersList!: UsersDto[];
  councilUsersList!: UsersDto[];
  salesHeadUserList: UsersDto[];
  userConfigForm!: FormGroup;
  filteredAccounts: any;
  filteredDms: any;
  filteredBdms: any = [];
  filteredSalesHeads: any = [];
  filteredCouncils: UsersDto[] = [];
  selectedAccountId: number;
  selectedDmId: number;
  selectedBdmId: number;
  bdm: string;
  selectedSalesHeadId: number;
  selectedCouncilIds: number[] = [];
  selectedCouncils: any = [];
  list: any;
  isDisabled = false;
  action: any;
  searchTerm = '';
  selectedAccountName = '';
  selected: boolean;
  searchCtrlDM = new FormControl('');
  filteredDMOptions!: Observable<any[]> | undefined;

  searchCtrlBDM = new FormControl('');
  filteredBDMOptions!: Observable<any[]> | undefined;
  hasFormChanges: boolean = false;
  originalValues: any;

  @ViewChild('accountInput') accountInput: ElementRef<HTMLInputElement>;
  @ViewChild('dmInput') dmInput: ElementRef<HTMLInputElement>;
  @ViewChild('bdmInput') bdmInput: ElementRef<HTMLInputElement>;
  @ViewChild('salesHeadInput') salesHeadInput: ElementRef<HTMLInputElement>;
  @ViewChild('councilInput') councilInput: ElementRef<HTMLInputElement>;
  @ViewChild('optsBDM') optsBDM: MatSelect;
  @ViewChild('optsDM') optsDM: MatSelect;
  @ViewChild('autocompleteTrigger') matACTrigger: MatAutocompleteTrigger;
  lastFilter: string = '';
  selection = new SelectionModel<any>(true, []);
  constructor(
    private userService: UserConfigService,
    public dialogRef: MatDialogRef<UserConfigDetailsComponent>,
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.list = data.workFlowDashboardData;
    this.action = data.action;
    this.selectedAccountId = this.list?.accountId;
    this.selectedAccountName = this.list?.accounts;
    this.selectedDmId = this.list?.dmUserId;
    this.selectedBdmId = this.list?.bdmUserId;
    this.selectedSalesHeadId = this.list?.salesHeadUserId;
    this.selectedCouncilIds = this.list?.councilUserIds;
    this.accountsList = data.allAccounts;
    this.usersList = data.allUsers;
  }

  ngAfterViewInit(): void { }

  ngOnInit(): void {
    if (this.action === 'edit') {
      this.isDisabled = true;
    }
    this.councilUsersList = [];
    this.userConfigForm = new FormGroup({
      accountFilterCtrl: new FormControl(
        {
          value: this.list?.accounts ? this.list?.accounts : '',
          disabled: this.isDisabled,
        },
        [Validators.required]
      ),
      dmFilterCtrl: new FormControl(
        Array.from(this.list?.dmUserId) || [],
        [Validators.required]
      ),
      bdmFilterCtrl: new FormControl(
        Array.from(this.list?.bdmUserId) || [],
        [Validators.required]
      )
    });
    this.councilUsersList = this.usersList?.filter((x) => x.isCouncil === true);
    this.getDMList();
    this.getBDMList();
  }
  public onClose(): void {
    this.dialogRef.close();
  }
  public onSave(): void {
    if (this.userConfigForm.valid) {
      const adduserConfig: any = {
        accountId: this.selectedAccountId,
        dmUserId: this.userConfigForm.value.dmFilterCtrl,
        bdmUserId: this.userConfigForm.value.bdmFilterCtrl,
        bdm: (this.optsDM.selected as any[]).map(x => x.viewValue),
        dm: (this.optsDM.selected as any[]).map(x => x.viewValue),
      };

      if (this.action === 'edit') {
        this.userService.updateUserConfigs(adduserConfig).subscribe((result) => {
          this.dialogRef.close({ data: result });
        });
      } else {
        this.userService.addUserConfig(adduserConfig).subscribe((result) => {
          this.dialogRef.close({ data: result });
        });
      }
      this.dialog.open(SuccessPopupComponent, {
        width: '530px',
        data: { message: 'Data Updated Successfully !' }
      });
    }
  }
  getAccountDetails(item: any) {
    this.selectedAccountId = item.accountId;
  }
  filterAccounts(event?: any): void {
    const filterValue = this.accountInput.nativeElement.value.toLowerCase();
    this.filteredAccounts = this.accountsList.filter((o) =>
      o.customerName.toLowerCase().includes(filterValue)
    );
  }
  private dMFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.usersList.filter((o) =>
      o.userName.toLowerCase().includes(filterValue) &&
      o.roles.includes('DM'))
  }
  private bDMFilter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.usersList.filter((o) =>
      o.userName.toLowerCase().includes(filterValue) &&
      o.roles.includes('BDM'))
  }

  isFormUnchanged(): boolean {
    return (
      JSON.stringify(this.userConfigForm.value) ===
      JSON.stringify(this.originalValues)
    );
  }
  getDMList() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.usersList = res;
        if (this.userConfigForm.value.roleIds === undefined) {
          this.userConfigForm.get('roleIds')?.setValue([]);
        }
        this.filteredDMOptions = this.searchCtrlDM.valueChanges.pipe(
          startWith(''),
          map((value) => {
            const name = typeof value === 'string' ? value : '';
            return name
              ? this.dMFilter(name as string)
              : this.usersList.slice();
          })
        );
        this.userConfigForm.valueChanges.subscribe(() => {
          this.hasFormChanges = !this.isFormUnchanged();
        });
      }
    })
  }
  getBDMList() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.usersList = res;
        if (this.userConfigForm.value.roleIds === undefined) {
          this.userConfigForm.get('roleIds')?.setValue([]);
        }
        this.filteredBDMOptions = this.searchCtrlBDM.valueChanges.pipe(
          startWith(''),
          map((value) => {
            const name = typeof value === 'string' ? value : '';
            return name
              ? this.bDMFilter(name as string)
              : this.usersList.slice();
          })
        );
        this.userConfigForm.valueChanges.subscribe(() => {
          this.hasFormChanges = !this.isFormUnchanged();
        });
      }
    })
  }
  isOptionDisabled(): boolean {
    return this.userConfigForm.value.dmFilterCtrl.length > 5 || this.userConfigForm.value.bdmFilterCtrl.length > 5;
  }
  onSelectionChange(a: MatOptionSelectionChange, type: string) {
    let values: string[] = type == 'DM' ? this.userConfigForm?.value.dmFilterCtrl : this.userConfigForm?.value.bdmFilterCtrl
    // this.userConfigForm?.value.userId || ([] as string[]);
    if (a.isUserInput) {
      if (a.source.selected && !values.includes(a.source.value)) {
        values.push(a.source.value);
      } else if (!a.source.selected && values.includes(a.source.value)) {
        values = values.filter((value) => value !== a.source.value);
      }
      if (type === 'DM') {
        this.userConfigForm.get('dmFilterCtrl')?.setValue(values);
      } else {
        this.userConfigForm.get('bdmFilterCtrl')?.setValue(values);
      }

    }
  }

  optionClicked(event: Event, user: any) {
    event.stopPropagation();
    this.toggleSelection(user);
  }
  toggleSelection(item: any) {
    this.selectedCouncils = [...this.selection.selected.map((a) => a.userName)];
    this.selectedCouncilIds = [...this.selection.selected.map((a) => a.userId)];
    this.userConfigForm.controls['councilFilterCtrl'].setValue(
      this.selectedCouncils
    );
  }

  openAuto(trigger: MatAutocompleteTrigger) {
    trigger.openPanel();
    this.councilInput.nativeElement.focus();
    console.log(trigger);
  }
}
