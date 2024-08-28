import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-show-comments',
  templateUrl: './show-comments.component.html',
  styleUrls: ['./show-comments.component.scss']
})
export class ShowCommentsComponent implements AfterViewInit  {
  workFlowDashboardData = new MatTableDataSource<any>();
  accountDetails : any;
  userRole:any;
  displayedColumns: string[] = ['userName','role', 'comment','timeStamp'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(public dialogRef: MatDialogRef<ShowCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.workFlowDashboardData=new MatTableDataSource<Element>(data.comments);
      this.workFlowDashboardData.paginator = this.paginator;
      this.accountDetails = data.accountName;
      this.userRole = '';
    }
  ngAfterViewInit(): void {
    this.workFlowDashboardData.paginator = this.paginator;
  }

  onClose(){
    this.dialogRef.close();
  }
}
