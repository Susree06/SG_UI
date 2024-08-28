import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ManageAccountEditComponent } from 'src/app/components/ramping/manage-account-edit/manage-account-edit.component';

export interface Element {
  Accounts: string;
  Projects:string;
  Average:string;
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

const ELEMENT_DATA: Element[] = [
  {Accounts: 'Ascend', Projects: 'Venti', Average: '30$', Location: 'Onsite',Jan:10,Feb:15,Mar:20,Apr:25,May:30,Jun:5,Jul:10,Aug:15,Sep:10,Oct:0,Nov:0,Dec:0,Action:''},
  {Accounts: '', Projects: '', Average: '', Location: 'Offshore',Jan:10,Feb:5,Mar:15,Apr:20,May:25,Jun:10,Jul:0,Aug:0,Sep:15,Oct:20,Nov:0,Dec:10,Action:'',},
  {Accounts: 'Anthology', Projects: 'Lithium', Average: '40$', Location: 'Onsite',Jan:5,Feb:15,Mar:10,Apr:12,May:11,Jun:15,Jul:10,Aug:5,Sep:15,Oct:17,Nov:20,Dec:0,Action:''},
  {Accounts: '', Projects: '', Average: '', Location: 'Offshore',Jan:5,Feb:15,Mar:10,Apr:20,May:15,Jun:10,Jul:15,Aug:5,Sep:20,Oct:10,Nov:20,Dec:10,Action:''},
];
@Component({
  selector: 'app-monthly-filter',
  templateUrl: './monthly-filter.component.html',
  styleUrls: ['./monthly-filter.component.scss']
})
export class MonthlyFilterComponent {
  toppings = this._formBuilder.group({
    jan: false,
    feb: false,
    mar: false,
    apr:false,
    may:false,
    jun:false,
    jul:false,
    aug:false,
    sep:false,
    oct:false,
    nov:false,
    dec:false
  });
  constructor(public dialogRef: MatDialogRef<MonthlyFilterComponent>,
    private _formBuilder: FormBuilder
    ) {}
  onClose(){
    this.dialogRef.close();
  }
  reportsPage(): void {
    const dialog = this.dialogRef.close();
  }
}