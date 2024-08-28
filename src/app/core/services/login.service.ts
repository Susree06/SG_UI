import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountDetails, BlendedRateDto } from '../models/account-wise-configuration.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private apiUrl = `${environment.pathName}`;
  //private apiUrl = 'https://salesguidance-happiestminds-dev.azurewebsites.net/api/Account'; // Replace with your API endpoint

    constructor(private http: HttpClient) {}
    
   public getUserDetails() {
    const url = `${this.apiUrl}Login/GetLoginInfo`;
    return this.http.get<any>(url);
   }
}