import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MonthlyFilterComponent } from '../../filters/monthly-filter/monthly-filter.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';

// export interface FirstTableElement {
//   Accounts: string;
//   Location: string;
//   janPYcount?:number,
//   janPYrev?:string,
//   febPYcount?:number,
//   febPYrev?:string,
//   marPYcount?:number,
//   marPYrev?:string,
//   aprCYcount?:number
//   aprCYrev?:string,
//   mayCYcount?:number,
//   mayCYrev?:string,
//   junCYcount?:number,
//   junCYrev?:string,
//   julCYcount?:number,
//   julCYrev?:string,
//   augCYcount?:number,
//   augCYrev?:string,
//   sepCYcount?:number,
//   sepCYrev?:string,
//   octCYcount?:number,
//   octCYrev?:string,
//   novCYcount?:number,
//   novCYrev?:string,
//   decCYcount?:number,
//   decCYrev?:string,
// }

// export interface SecondTableElement {
//   janPYcount?:number,
//   janPYrev?:string,
//   febPYcount?:number,
//   febPYrev?:string,
//   marPYcount?:number,
//   marPYrev?:string,
//   aprCYcount?:number
//   aprCYrev?:string,
//   mayCYcount?:number,
//   mayCYrev?:string,
//   junCYcount?:number,
//   junCYrev?:string,
//   julCYcount?:number,
//   julCYrev?:string,
//   augCYcount?:number,
//   augCYrev?:string,
//   sepCYcount?:number,
//   sepCYrev?:string,
//   octCYcount?:number,
//   octCYrev?:string,
//   novCYcount?:number,
//   novCYrev?:string,
//   decCYcount?:number,
//   decCYrev?:string,
// }

// const First_ELEMENT_DATA: FirstTableElement[] = [
//   {Accounts: 'Ascend', Location: 'Venti',janPYcount:23, janPYrev:'1000 $', febPYcount:30, febPYrev:'3300 $',marPYcount:30,marPYrev:'3300 $',aprCYcount:15, aprCYrev:'2350 $', mayCYcount:15, mayCYrev:'2350 $',junCYcount:15,junCYrev:'2350 $',julCYcount:15,julCYrev:'2350 $',augCYcount:15,augCYrev:'2350 $',sepCYcount:15,sepCYrev:'2350 $',octCYcount:15,octCYrev:'2350 $',novCYcount:15,novCYrev:'2350 $',decCYcount:15,decCYrev:'2350 $'},
//   {Accounts: 'Anthalogy', Location: 'Lithium',janPYcount:23, janPYrev:'1000 $', febPYcount:30, febPYrev:'3300 $',marPYcount:30,marPYrev:'3300 $',aprCYcount:15, aprCYrev:'2350 $', mayCYcount:15, mayCYrev:'2350 $',junCYcount:15,junCYrev:'2350 $',julCYcount:15,julCYrev:'2350 $',augCYcount:15,augCYrev:'2350 $',sepCYcount:15,sepCYrev:'2350 $',octCYcount:15,octCYrev:'2350 $',novCYcount:15,novCYrev:'2350 $',decCYcount:15,decCYrev:'2350 $'},
//   {Accounts: 'Eaton', Location: 'ATI', janPYcount:23, janPYrev:'1000 $', febPYcount:30, febPYrev:'3300 $',marPYcount:30,marPYrev:'3300 $',aprCYcount:15, aprCYrev:'2350 $', mayCYcount:15, mayCYrev:'2350 $',junCYcount:15,junCYrev:'2350 $',julCYcount:15,julCYrev:'2350 $',augCYcount:15,augCYrev:'2350 $',sepCYcount:15,sepCYrev:'2350 $',octCYcount:15,octCYrev:'2350 $',novCYcount:15,novCYrev:'2350 $',decCYcount:15,decCYrev:'2350 $'},
//   {Accounts: 'Anthalogy', Location: 'Lithium',janPYcount:23, janPYrev:'1000 $', febPYcount:30, febPYrev:'3300 $',marPYcount:30,marPYrev:'3300 $',aprCYcount:15, aprCYrev:'2350 $', mayCYcount:15, mayCYrev:'2350 $',junCYcount:15,junCYrev:'2350 $',julCYcount:15,julCYrev:'2350 $',augCYcount:15,augCYrev:'2350 $',sepCYcount:15,sepCYrev:'2350 $',octCYcount:15,octCYrev:'2350 $',novCYcount:15,novCYrev:'2350 $',decCYcount:15,decCYrev:'2350 $'},
// ];

// const Second_ELEMENT_DATA: SecondTableElement[] = [
//   {janPYcount:23, janPYrev:'1000 $', febPYcount:30, febPYrev:'3300 $',marPYcount:30,marPYrev:'3300 $',aprCYcount:15, aprCYrev:'2350 $', mayCYcount:15, mayCYrev:'2350 $',junCYcount:15,junCYrev:'2350 $',julCYcount:15,julCYrev:'2350 $',augCYcount:15,augCYrev:'2350 $',sepCYcount:15,sepCYrev:'2350 $',octCYcount:15,octCYrev:'2350 $',novCYcount:15,novCYrev:'2350 $',decCYcount:15,decCYrev:'2350 $'},
//   {janPYcount:23, janPYrev:'1000 $', febPYcount:30, febPYrev:'3300 $',marPYcount:30,marPYrev:'3300 $',aprCYcount:15, aprCYrev:'2350 $', mayCYcount:15, mayCYrev:'2350 $',junCYcount:15,junCYrev:'2350 $',julCYcount:15,julCYrev:'2350 $',augCYcount:15,augCYrev:'2350 $',sepCYcount:15,sepCYrev:'2350 $',octCYcount:15,octCYrev:'2350 $',novCYcount:15,novCYrev:'2350 $',decCYcount:15,decCYrev:'2350 $'},
//   {janPYcount:23, janPYrev:'1000 $', febPYcount:30, febPYrev:'3300 $',marPYcount:30,marPYrev:'3300 $',aprCYcount:15, aprCYrev:'2350 $', mayCYcount:15, mayCYrev:'2350 $',junCYcount:15,junCYrev:'2350 $',julCYcount:15,julCYrev:'2350 $',augCYcount:15,augCYrev:'2350 $',sepCYcount:15,sepCYrev:'2350 $',octCYcount:15,octCYrev:'2350 $',novCYcount:15,novCYrev:'2350 $',decCYcount:15,decCYrev:'2350 $'},
//   {janPYcount:23, janPYrev:'1000 $', febPYcount:30, febPYrev:'3300 $',marPYcount:30,marPYrev:'3300 $',aprCYcount:15, aprCYrev:'2350 $', mayCYcount:15, mayCYrev:'2350 $',junCYcount:15,junCYrev:'2350 $',julCYcount:15,julCYrev:'2350 $',augCYcount:15,augCYrev:'2350 $',sepCYcount:15,sepCYrev:'2350 $',octCYcount:15,octCYrev:'2350 $',novCYcount:15,novCYrev:'2350 $',decCYcount:15,decCYrev:'2350 $'},
// ];

@Component({
  selector: 'app-quaterly-sales-tab',
  templateUrl: './quaterly-sales-tab.component.html',
  styleUrls: ['./quaterly-sales-tab.component.scss']
})
export class QuaterlySalesTabComponent {
  @Input() salesGuidanceDtoList:any;
  //tableFirst = new MatTableDataSource<any[]>();
  //tableSecond = new MatTableDataSource<any[]>();
  tableFirst : any[]=[];
  tableSecond : any[]=[];
  accountNameList! : any;
  displayedColumns: string[] = ['Accounts', 'Location','janPYcount1', 'janPYrev1', 'febPYcount2','febPYrev2', 'marPYcount3', 'marPYrev3','aprCYcount4', 'aprCYrev4', 'mayCYcount5','mayCYrev5', 'junCYcount6', 'junCYrev6','julCYcount7', 'julCYrev7','augCYcount8', 'augCYrev8','sepCYcount9', 'sepCYrev9','octCYcount10', 'octCYrev10','novCYcount11', 'novCYrev11','decCYcount12', 'decCYrev12'];
  secondDisplayedColumns: string[] = ['janPYcount', 'janPYrev', 'febPYcount','febPYrev', 'marPYcount', 'marPYrev','aprCYcount', 'aprCYrev', 'mayCYcount','mayCYrev', 'junCYcount', 'junCYrev','julCYcount', 'julCYrev','augCYcount', 'augCYrev','sepCYcount', 'sepCYrev','octCYcount', 'octCYrev','novCYcount', 'novCYrev','decCYcount', 'decCYrev'];
  //dataSource = First_ELEMENT_DATA;
  //secondDataSource = Second_ELEMENT_DATA;
  constructor(private router: Router,public dialog: MatDialog){
    //console.log(['salesGuidanceDtoList']);
  }
  
  ngOnInit(): void {
    console.log(this.salesGuidanceDtoList);
    if(this.salesGuidanceDtoList != undefined)
    {
   this.tableFirst = this.salesGuidanceDtoList[0];
   this.tableSecond = this.salesGuidanceDtoList[1];
    }
   // this.accountNameList = this.tableFirst.accountName;
  }
  getDataSource()
  {
    if(this.tableFirst.length>0)
    {
     return this.tableFirst
    }
    return this.tableSecond;
  }
  ngDoCheck()
  {
    console.log(this.salesGuidanceDtoList);
    if(this.salesGuidanceDtoList != undefined)
    {
    this.tableFirst = this.salesGuidanceDtoList[0];
    this.tableSecond = this.salesGuidanceDtoList[1];
    }
    //this.accountNameList = this.tableFirst.accountName;
  }
  onFilter(): void {
    const dialogRef = this.dialog.open(MonthlyFilterComponent, {
      width: '440px',
      height: '277px'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
