import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResultPagingDto } from '../models/pagination.model';
import { LeavesDto } from '../models/account-wise-configuration.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeavesService {

  private apiUrl = `${environment.pathName}`;
  //private apiUrl = 'https://localhost:44377/api/Leaves'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  public getConfig(): Observable<any> {
       return this.http.get<any[]>(`${this.apiUrl}Leaves/PaginatedLeaves`);
     }

  public updateLeaves(
    updateLeaves: LeavesDto
  ): Observable<LeavesDto> {
    return this.http.put<LeavesDto>(
      `${this.apiUrl}Leaves/UpdateLeavesDetails`,
      updateLeaves
    );
  }
}
