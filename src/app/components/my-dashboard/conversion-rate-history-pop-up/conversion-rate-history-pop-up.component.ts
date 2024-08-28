import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConversionRateService } from 'src/app/core/services/conversionrate.service';

@Component({
  selector: 'app-conversion-rate-history-pop-up',
  templateUrl: './conversion-rate-history-pop-up.component.html',
  styleUrls: ['./conversion-rate-history-pop-up.component.scss']
})
export class ConversionRateHistoryPopUpComponent {
  dataSource = new MatTableDataSource<any>();
  displayedColumns = [
    'Currency',
    'ToUSD($)',
    'FromDate',
    'ModifiedBy',
  ];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
  public dialogRef: MatDialogRef<ConversionRateHistoryPopUpComponent>, private router:Router,
  public conversionRateService : ConversionRateService){

  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit():void{
    this.dataSource = new MatTableDataSource<Element>(this.data.ConversionRate);
    // this.dataSource=this.data.ConversionRate;
    this.dataSource.paginator = this.paginator;

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onClose(): void {
    this.dialogRef.close();
  }



}
