import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDetails, BlendedRateDto, IGDetails, ProjectDetails } from '../models/account-wise-configuration.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = `${environment.pathName}`;
  //private apiUrl = 'https://salesguidance-happiestminds-dev.azurewebsites.net/api/Account'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  public getAllAccounts() : Observable<AccountDetails[]> {
    const url = `${this.apiUrl}Account/GetAllAccounts`;
    return this.http.get<AccountDetails[]>(url);
   }
   public GetAllProjects() : Observable<ProjectDetails[]> {
    const url = `${this.apiUrl}Account/GetAllProjects`;
    return this.http.get<ProjectDetails[]>(url);
   }
   public GetAllIndustryGroups() : Observable<IGDetails[]> {
    const url = `${this.apiUrl}Account/GetAllIndustryGroups`;
    return this.http.get<IGDetails[]>(url);
   }
}
