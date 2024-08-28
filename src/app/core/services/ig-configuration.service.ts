import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SearchResultPagingDto } from '../models/pagination.model';
import { IgConfigurationDTO } from '../models/ig-configuration.model';

@Injectable({
  providedIn: 'root',
})
export class IgConfigurationService {
  private apiUrl = `${environment.pathName}`;
  //private apiUrl = 'https://localhost:44377/api/BlendedRate'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  public getIgConfig(): Observable<any> {
    const url = `${this.apiUrl}IndustryGroup/GetIndustryGroups`;
    return this.http.get(url);
  }

  public getIgHeadConfig(): Observable<any>{
    const url = `${this.apiUrl}UserConfiguration/GetAllusers`;
    return this.http.get(url);
  }

  public updateIgConfiguration(updateIgConfiguration: IgConfigurationDTO): Observable<IgConfigurationDTO> {
    return this.http.put<IgConfigurationDTO>(
      `${this.apiUrl}IndustryGroup/UpdateIndustryGroup`,
      updateIgConfiguration
    );
  }

  public addIgConfiguration(addIgConfiguration: IgConfigurationDTO):Observable<IgConfigurationDTO>{
    return this.http.post<IgConfigurationDTO>(
      `${this.apiUrl}IndustryGroup/AddIndustryGroup`,
      addIgConfiguration
    )
  }

}
