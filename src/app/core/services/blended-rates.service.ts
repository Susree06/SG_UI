import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResultPagingDto } from '../models/pagination.model';
import { BlendedRateDto } from '../models/account-wise-configuration.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlendedRatesService {
  private apiUrl = `${environment.pathName}`;
  //private apiUrl = 'https://localhost:44377/api/BlendedRate'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  public getBlendedRates(): Observable<any> {
    const url = `${this.apiUrl}BlendedRate/BlendedRate/AccountConfigBlendedRates`;
    return this.http.get(url);
  }

  public updateBlandedRates(
    updateBlendedRates: BlendedRateDto
  ): Observable<BlendedRateDto> {
    return this.http.put<BlendedRateDto>(
      `${this.apiUrl}BlendedRate/UpdateBlendedRatesDetails`,
      updateBlendedRates
    );
  }

  public addNew(blendedRate: BlendedRateDto): Observable<any> {
    const url = `${this.apiUrl}BlendedRate/BlendedRate/AddBlendedRates`;
    return this.http.post(url, blendedRate);
  }
  public deleteAccount(
    accountId: number,
    projectId: number,
    type: string,
    location: string
  ): Observable<any> {
    const url = `${this.apiUrl}BlendedRate/BlendedRate/DeleteAccount?accountId=`+accountId+`&projectId=`+projectId+`&type=`+type+`&location=`+location;
    return this.http.delete<any>(url);
  }
}
