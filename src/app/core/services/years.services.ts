import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDetails, BlendedRateDto } from '../models/account-wise-configuration.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YearsServices {
  private apiUrl = `${environment.pathName}`;

  constructor(private http: HttpClient) {}

  public getYears() : Observable<AccountDetails[]> {
    const url = `${this.apiUrl}SalesGuidance/GetAllYears`;
    return this.http.get<AccountDetails[]>(url);
  }

  public getYearsTab(tabName) : Observable<AccountDetails[]> {
    const url = `${this.apiUrl}SalesGuidance/GetAllYears?tabname=${tabName}`;
    return this.http.get<AccountDetails[]>(url);
  }
}
