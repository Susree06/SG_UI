import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserConfigurationDto, UserDetailDto, UsersDto } from '../models/user-config.model';
import { SearchResultPagingDto } from '../models/pagination.model';
import { AccountDetails } from '../models/account-wise-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

  private apiUrl = `${environment.pathName}`;

  constructor(private http: HttpClient) { }

  public getAllUsers() : Observable<UsersDto[]> {
    const url = `${this.apiUrl}UserConfiguration/GetAllusers`;
    return this.http.get<UsersDto[]>(url);
   }

   public getUserConfigs() : Observable<any>
   {
       const url = `${this.apiUrl}UserConfiguration/UserConfigurations`;
       return this.http.get(url)
   }
   public updateUserConfigs(updateuserConfig: UserConfigurationDto): Observable<UserConfigurationDto> {
    return this.http.put<UserConfigurationDto>(`${this.apiUrl}UserConfiguration/UpdateUserConfigurations`,updateuserConfig);
  }

  public addUserConfig(userConfig : UserDetailDto) : Observable<any>
  {
      const url = `${this.apiUrl}UserConfiguration/AddUserConfig`;
      return this.http.post(url , userConfig)
  }
  public getUserConfiguredAccounts() : Observable<AccountDetails[]> {
    const url = `${this.apiUrl}UserConfiguration/GetConfiguredAccounts`;
    return this.http.get<AccountDetails[]>(url);
   }


}
