import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GenerateReportComponent } from '../report-files/generate-report/generate-report.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  constructor(public dialog: MatDialog, private router:Router){

  }

  reportsPage(): void {
    const dialogRef = this.dialog.open(GenerateReportComponent, {
      
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  viewDetails(){
   this.router.navigate(['/reportFiles']);
  }

}
