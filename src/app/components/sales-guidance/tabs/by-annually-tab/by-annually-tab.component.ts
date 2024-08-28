import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BlendedRateEditComponent } from 'src/app/components/account-wise-configuration/account-config-edits/blended-rate-edit/blended-rate-edit.component';

export interface Element {
  Accounts: string;
  // Projects:string;
  //Average:string;
  BlendedRate:string;
  Location:string;
  Action:string
}


const ELEMENT_DATA: Element[] = [
  // {Accounts: 'Ascend', BlendedRate:'10$',Average:'10$',Location: 'Onsite',Action:''},
  // {Accounts: '', BlendedRate:'20$',Average:'20$',Location: 'Offshore',Action:'',},
  // {Accounts: 'Anthology',BlendedRate:'30$',Average:'30$', Location: 'Onsite',Action:''},
  // {Accounts: '',BlendedRate:'40$',Average:'40$', Location: 'Offshore',Action:''},
  {Accounts: 'Ascend', BlendedRate:'10$',Location: 'Onsite',Action:''},
  {Accounts: '', BlendedRate:'20$',Location: 'Offshore',Action:'',},
  {Accounts: 'Anthology',BlendedRate:'30$', Location: 'Onsite',Action:''},
  {Accounts: '',BlendedRate:'40$', Location: 'Offshore',Action:''},
];

@Component({
  selector: 'app-by-annually-tab',
  templateUrl: './by-annually-tab.component.html',
  styleUrls: ['./by-annually-tab.component.scss']
})
export class ByAnnuallyTabComponent {

  displayedColumns = ['Accounts','BlendedRate','Location','Action'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  constructor(public dialogRef: MatDialog){

  }
  editAccDetails(){
    this.dialogRef.open(BlendedRateEditComponent,{
    width: '350px',
    height: '270px'
     })
   }
}
