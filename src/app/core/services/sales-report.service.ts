import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
var serviceURL = '';

@Injectable({
  providedIn: 'root'
})

export class SalesReportService {
    private apiUrl = `${environment.pathName}`;
    constructor(private http: HttpClient){}

    getSalesReport(serviceEndpoint:any){
        serviceURL = `${this.apiUrl}` + serviceEndpoint;
        return this.http.get<any[]>(serviceURL);
    }

    AddSalesReportDetails(serviceEndpoint: any, data: any): Observable<any> {
        serviceURL = `${this.apiUrl}` + serviceEndpoint;
        return this.http.post(serviceURL, data);
      }
}