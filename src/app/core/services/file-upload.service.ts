import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FileUploadStatusDto } from '../models/account-wise-configuration.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
     ReportName: string='';

    public setTest(value: string) {
        this.ReportName = value;
    }

  private apiUrl = `${environment.pathName}Reports/UploadReport`;
  //private apiUrl = 'https://localhost:44377/api/Reports/UploadReport'; // Replace with your API endpoint
  constructor(private http: HttpClient) {}
  uploadFile(ReportName:string,Report:File,ReportType:string) {
    const formData = new FormData();
    formData.append('ReportName', ReportName);
    formData.append('Report', Report);
    formData.append('ReportType', ReportType);
    return this.http.post<any>(this.apiUrl,formData);
  }

  public getAllFileUploadList() : Observable<any> {
    const url = `${environment.pathName}Reports/FileUploadList`;
    return this.http.get<any>(url);
   }
}
