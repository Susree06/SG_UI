import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FileUploadStatusDto } from 'src/app/core/models/account-wise-configuration.model';
import { FileUploadService } from 'src/app/core/services/file-upload.service';

@Component({
  selector: 'app-file-upload-status',
  templateUrl: './file-upload-status.component.html',
  styleUrls: ['./file-upload-status.component.scss']
})
export class FileUploadStatusComponent {
  displayedColumns = ['FileName', 'UploadedBy', 'Remark', 'Status', 'Download','CreatedOn'];
  isLoaded:boolean = false;
  dataSource = new MatTableDataSource<FileUploadStatusDto>();
  fileUploadedList !: FileUploadStatusDto[];
  index:number=1;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(public dialogRef: MatDialog, private fileUploadService: FileUploadService) {
  }

  ngAfterViewInit(): void {
    this.fileUploadService.getAllFileUploadList().subscribe((result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.index
        this.isLoaded=true;
    }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isOverflow(el: HTMLElement): boolean {
    var curOverflow = el.style.overflow;
    if (!curOverflow || curOverflow === "visible")
      el.style.overflow = "hidden";
    var isOverflowing = el.clientWidth < el.scrollWidth
      || el.clientHeight < el.scrollHeight;
    el.style.overflow = curOverflow;
    return isOverflowing;
  }
}
