import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResultPagingDto } from '../models/pagination.model';
import { MonthsDto, YearsDto } from '../models/work-flow-dashboard.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkFlowDashboardService {

  private apiUrl = `${environment.pathName}`;
  //private apiUrl = 'https://localhost:44377/api/WorkFlowDashboard'; // Replace with your API endpoint
 
  constructor(private http: HttpClient) {}

  public getAccountWiseStatus(accountId:number, year:number, month:string): Observable<any> {
       return this.http.get<any[]>(`${this.apiUrl}WorkFlowDashboard/PaginatedAccountWiseStatus?accountId=`+accountId+`&year=`+year+`&month=`+month+``);
     }

     public getYears() : Observable<YearsDto[]> {
      const url = `${this.apiUrl}WorkFlowDashboard/GetYears`;
      return this.http.get<YearsDto[]>(url);
     }
}
