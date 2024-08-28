import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit,OnChanges {
  @Input() reportsList:any[] =[];
  @Input() reportName: any;
  reports:any [] =['Report 1','Report 2','Report 3','Report 4','Report 5','Report 6','Report 7']
  constructor(private router:Router){
  }
  ngOnInit(): void {
  
  }
  accConfig(){
   this.router.navigate(['/account-config']);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reportName']?.currentValue) {
      this.reports.push(this.reportName);
    }
  }
}
