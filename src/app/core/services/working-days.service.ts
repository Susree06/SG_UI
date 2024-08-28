import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResultPagingDto } from '../models/pagination.model';
import { WorkingDaysDto } from '../models/account-wise-configuration.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkingDaysService {

  private apiUrl = `${environment.pathName}`;
  //private apiUrl = 'https://localhost:44377/api/WorkingDays'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // getAllWorkingDays(): Observable<any[]> {
  //   const queryParam = new HttpParams();
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  public getConfig(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}WorkingDays/PaginatedWorkingDays`);
  }

  public updateWorkingDays(
    updateWorkingDays: WorkingDaysDto
  ): Observable<WorkingDaysDto> {
    return this.http.put<WorkingDaysDto>(
      `${this.apiUrl}WorkingDays/UpdateWorkingDaysDetails`,
      updateWorkingDays
    );
  }
}
