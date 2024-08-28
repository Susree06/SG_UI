import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkingHours } from '../models/account-wise-configuration.model';
import { SearchResultPagingDto } from '../models/pagination.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkingHoursService {

  private apiUrl = `${environment.pathName}`;
 // private apiUrl = 'https://localhost:44377/api/WorkingHours'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  public getConfig(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}WorkingHours/PaginatedWorkingHours`);
  }
 
  public updateWorkingHours(
    updateWorkingHours: WorkingHours
  ): Observable<WorkingHours> {
    return this.http.put<WorkingHours>(
      `${this.apiUrl}WorkingHours/UpdateWorkingHoursDetails`,
      updateWorkingHours
    );
  }
}
