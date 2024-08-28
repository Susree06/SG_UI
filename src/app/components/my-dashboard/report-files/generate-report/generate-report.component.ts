import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { ValidationPopupComponent } from '../../validation-popup/validation-popup.component';
import { SuccessPopupComponent } from '../../success-popup/success-popup.component';
import { FailedPopupComponent } from '../../failed-popup/failed-popup.component';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss'],
})
export class GenerateReportComponent {
  reports: any[] = [
    'Report 1',
    'Report 2',
    'Report 3',
    'Report 4',
    'Report 5',
    'Report 6',
    'Report 7',
  ];
  selectedFileType = 1;

  fileTypes: any[] = [
  
    { id: 1, name: 'Ramp-Up',ReportType:'Ramp-Up', downloadLink: 'https://salesguidancedev.blob.core.windows.net/saleguidance-templates/Rampup_Details.xlsx?sp=r&st=2024-08-12T10:50:57Z&se=2027-01-31T18:50:57Z&spr=https&sv=2022-11-02&sr=b&sig=SYBd7FFGf4WWuKZ62LsQ2QFv0AA7IAMNfqY4%2FvRRutQ%3D' },
    { id: 2, name: 'Ramp-Down',ReportType:'Ramp-Down', downloadLink: 'https://salesguidancedev.blob.core.windows.net/saleguidance-templates/Rampdown_Details.xlsx?sp=r&st=2024-08-12T10:53:04Z&se=2027-01-31T18:53:04Z&spr=https&sv=2022-11-02&sr=b&sig=daCPm4N%2F2BjBuZKwophSABUhza0AJcj3cS0g0bA4UOQ%3D' },
    {
      id: 3,
      name: 'Invoice',ReportType:'Invoice',
      downloadLink:
        'https://salesguidancedev.blob.core.windows.net/saleguidance-templates/Invoice%20Details.xlsx?sp=r&st=2024-02-02T06:20:29Z&se=2026-02-02T14:20:29Z&spr=https&sv=2022-11-02&sr=b&sig=HsY9yS0uKfirD99F5S7Oz177MGssSNOdWrIDXeSwiYY%3D',
    },
    // { id: 4, name: 'FP',ReportType:'FP',downloadLink: 'link_to_FP_template' },
    // { id: 5, name: 'FMB',ReportType:'FMB', downloadLink: 'link_to_FMB_template' },
  ];

  selectedOption: number = 1;
  Report: File | null = null;
  uploadSuccess = false;
  ReportName: string = '';
  selectedFileTypeName = 'Ramp-Up';
  selectedFileTypeLink = 'https://salesguidancedev.blob.core.windows.net/saleguidance-templates/Rampup_Details.xlsx?sp=r&st=2024-08-12T10:50:57Z&se=2027-01-31T18:50:57Z&spr=https&sv=2022-11-02&sr=b&sig=SYBd7FFGf4WWuKZ62LsQ2QFv0AA7IAMNfqY4%2FvRRutQ%3D';
  ReportType:string='Ramp-Up';

  @ViewChild('fileInput', { static: false })
  public fileInput!: ElementRef;
  // @ViewChild('reportName', { static: false })
  // public reportName: string='';
  constructor(
    private fileUploadService: FileUploadService,
    public dialogRef: MatDialogRef<GenerateReportComponent>,
    private dialogBox: MatDialog
  ) {}

  closePopUp(): void {
    this.dialogRef.close();
  }

  // reportsPage(): void {
  //   const dialog = this.dialogRef.close();
  // }
  @Input() accept = '.xlsx';
  @Input() color = 'default';
  @Input() icon = 'cloud_upload';
  @Input() iconClass = 'material-icons-outlined';
  @Input() multiple = false;
  @Output() selected = new EventEmitter<{ files: File[]; form: FormData }>();
  // @Output() childEvent = new EventEmitter();

  // fileChange = (event: any) => {
  //   const files: FileList = event.target.files;
  //   const fileList = new Array<File>();
  //   const formData = new FormData();
  //   this.selected.emit({ files: fileList, form: formData });
  // }

  onClose() {
    this.dialogRef.close();
  }

  onFileChange(event: Event) {
    event.preventDefault();
    const fileInput = event.target as HTMLInputElement;
    // const reportName = event.target as HTMLInputElement;
    this.Report = (fileInput?.files as FileList)[0];
    this.ReportName=this.Report.name;
  }

  uploadFile() {
    if (this.Report) {
      if (this.isExcelFile(this.Report.name)) {
        this.fileUploadService
          .uploadFile(this.ReportName, this.Report, this.ReportType)
          .subscribe((data) => {
            if (!data.error) {
              this.dialogRef.close({ data: reportData });
              this.openSucessPopup();
            } else {
              this.openFailedPopup();
            }
          });
        this.reports.push(this.Report);
        const reportData = { reportName: this.ReportName, report: this.Report , reportType:this.ReportType };
        this.uploadSuccess = true;
        this.Report = null;
        this.fileInput.nativeElement.value = [];
        // this.childEvent.emit(this.reports);
      } else {
        this.openValidationPopup();
        this.uploadSuccess = false;
        this.Report = null;
        this.fileInput.nativeElement.value = [];
        this.ReportName = '';
      }
    } else {
      this.dialogBox.open(ValidationPopupComponent, {
        data: {
          message: 'Please select an appropriate file to upload.',
          title: 'Select File !',
        },
      });
    }
  }

  private isExcelFile(fileName: string): boolean {
    const extensionsAllowed = ['.xlsx', '.xls', '.xlsm', '.csv'];
    const uploadedFileExtension = '.' + fileName.split('.').pop();
    return extensionsAllowed.includes(uploadedFileExtension.toLowerCase());
  }

  private openValidationPopup() {
    this.dialogBox.open(ValidationPopupComponent, {
      data: {
        message:
          'The selected file format is not valid. Please select an Excel file.',
        title: 'Invalid File Format !',
      },
    });
  }

  private openSucessPopup() {
    this.dialogBox.open(SuccessPopupComponent, {
      data: { message: 'File Uploaded Successfully !' },
    });
  }

  private openFailedPopup() {
    this.dialogBox.open(FailedPopupComponent, {});
  }

  sendValueIntoService(value: string) {
    this.fileUploadService.setTest(value);
  }
  radioButtonOnChange(event: any) {
    try {
      this.selectedFileType = event.id;
      this.selectedFileTypeName = event.name;
      this.selectedFileTypeLink = event.downloadLink;
      this.fileInput.nativeElement.value = [];
      this.ReportType = event.ReportType;
      this.Report = null;
      this.ReportName = '';
    } catch (err) {
      // this.openValidationPopup(err, 'Error in radio button change !');
    }
  }
}
