import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResultPagingDto } from '../models/pagination.model';
import { HolidaysDetailsDto, HolidaysDto } from '../models/account-wise-configuration.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  private apiUrl = `${environment.pathName}`;
  //private apiUrl = 'https://localhost:44377/api/Holidays'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  public getAllHolidays(currentYear) : Observable<HolidaysDetailsDto[]> {
        const url = `${this.apiUrl}Holidays/Holidays?year=${currentYear}`;
        return this.http.get<HolidaysDetailsDto[]>(url);
       }

       public getPaginatedHolidays() : Observable<any>
       {
           const url = `${this.apiUrl}Holidays/Holidays/AccountConfigHolidays`;
           return this.http.get(url)
       }

  public getHolidaysById(accountId: number, location: string): Observable<HolidaysDto> {
    let queryParam = new HttpParams();
    queryParam = queryParam.append('accountId', String(accountId));
    queryParam = queryParam.append('location', location);
    const url = `${this.apiUrl}Holidays/GetHolidaysById`;
    return this.http.get<any>(url, {
      params: queryParam,
    });
  }

  public updateHolidays(updateHolidays: HolidaysDto): Observable<HolidaysDto> {
    return this.http.put<HolidaysDto>(`${this.apiUrl}Holidays/UpdateHolidaysDetails`,updateHolidays);
  }
}
