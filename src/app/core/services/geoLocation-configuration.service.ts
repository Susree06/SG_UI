import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GeoLocationDto } from '../models/geoLocation-configuration.model';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationConfigurationService {
  private apiUrl = `${environment.pathName}`;
  //private apiUrl = 'https://localhost:44377/api/BlendedRate'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  public getGeoLocationConfig(): Observable<any> {
    const url = `${this.apiUrl}GeoLocation/GetAllGeolocations`;
    return this.http.get(url);
  }

  public updateIgConfiguration(updateIgConfiguration: GeoLocationDto): Observable<GeoLocationDto> {
    return this.http.put<GeoLocationDto>(
      `${this.apiUrl}GeoLocation/UpdateGeoLocation`,
      updateIgConfiguration
    );
  }

  public addGeoLocationConfiguration(addIgConfiguration: GeoLocationDto):Observable<GeoLocationDto>{
    return this.http.post<GeoLocationDto>(
      `${this.apiUrl}GeoLocation/AddGeoLocation`,
      addIgConfiguration
    )
  }

}
