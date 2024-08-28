import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GenerateReportComponent } from '../../my-dashboard/report-files/generate-report/generate-report.component';

@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.scss']
})
export class AccountConfigComponent {
  reportsList:any[]=[];
  reportName:string='';
  isAdmin: boolean = false;
constructor(public dialog: MatDialog, private router:Router){
  if(sessionStorage.getItem("isAdmin") !== null) {
    this.isAdmin = sessionStorage.getItem("isAdmin") == "false" ? false : true;
  } 
}

reportsPage(): void {
  const dialogRef = this.dialog.open(GenerateReportComponent, {
      width: '650px',
      height: 'max-content',
  });
  dialogRef.afterClosed().subscribe(result => {
    // this.reportsList = result.data.report;
    // this.reportName = result.data.reportName;
  });
}
}

