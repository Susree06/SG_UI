import { OtherConfigDto } from '../models/account-wise-configuration.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { SearchResultPagingDto } from "../models/pagination.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class OtherConfigService{
  private apiUrl = `${environment.pathName}`;
  //private apiUrl = 'https://localhost:44377/api/BlendedRate'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  public getOtherConfig(): Observable<OtherConfigDto[]> {
    const url = `${this.apiUrl}Account/GetAccountOtherConfig`;
    return this.http.get<OtherConfigDto[]>(url);
  }

  public updateOtherConfig( updateOtherConfig: OtherConfigDto): Observable<any> {
    return this.http.put<OtherConfigDto>(`${this.apiUrl}Account/UpdateOtherConfigDetails`,updateOtherConfig);
  }

  public getAllAccounts(): Observable<OtherConfigDto[]> {
    const url = `${this.apiUrl}Account/GetAllAccounts`;
    return this.http.get<OtherConfigDto[]>(url);
  }

  public getIgConfig(): Observable<any[]> {
    const url = `${this.apiUrl}IndustryGroup/GetIndustryGroups`;
    return this.http.get<any[]>(url);
  }
  public getGeoLocationConfig(): Observable<any[]> {
    const url = `${this.apiUrl}GeoLocation/GetAllGeolocations`;
    return this.http.get<any[]>(url);
  }

}
