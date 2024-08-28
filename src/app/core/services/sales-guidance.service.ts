import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SalesGuidanceDto } from '../models/sales-guidance.model';
import { SearchResultPagingDto } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class SalesGuidanceService {
    private apiUrl = `${environment.pathName}`;
    //private apiUrl = 'https://localhost:44377/api/WorkFlowDashboard'; // Replace with your API endpoint
   
    constructor(private http: HttpClient) {}
  
    public getSalesGuidanceReport(
        year1: number,
        year2 : number
      ): Observable<SalesGuidanceDto> {
        let queryParam = new HttpParams();
        queryParam = queryParam.append('year1', Number(year1));
        queryParam = queryParam.append('year2', Number(year2));
        return this.http.get<SalesGuidanceDto>(`${this.apiUrl}SalesGuidance/GetMonthlyReports`, {
          params: queryParam,
        });
      }

//     public getSalesGuidanceReport(pagination : SearchResultPagingDto, year1:number, year2:number): Observable<any> {
//         return this.http.post<any[]>(`${this.apiUrl}WorkFlowDashboard/PaginatedAccountWiseStatus?accountId=`+year1+`&year=`+year2+``,pagination);
//       }
}