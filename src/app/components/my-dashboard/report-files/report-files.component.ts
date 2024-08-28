import { Component, Input } from '@angular/core'; 
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenerateReportComponent } from './generate-report/generate-report.component';

@Component({
  selector: 'app-report-files',
  templateUrl: './report-files.component.html',
  styleUrls: ['./report-files.component.scss']
})
export class ReportFilesComponent {
  searchText = '';
  @Input() reportsList:any[]=[];
  reportName:string='';

  constructor(public dialog: MatDialog, private router:Router){

  }
  reportsPage(): void {
    const dialogRef = this.dialog.open(GenerateReportComponent, {
      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.reportsList = result.data.report;
      this.reportName = result.data.reportName;
    });
  }

  onSearch(event:any) {
    // if (this.searchText.length > 0) {
    //   this.searchFlag = true;
    //   this.filteredGoalSets = this.getSearchedGoalSet(this.customGoals);
    // } else this.searchFlag = false;
    // if (this.filterFlag) this.goalSetFilter(this.filterProgramType);
  }

  backToDashboard(){
    this.router.navigate(['/dashboard']);
}
}
