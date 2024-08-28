import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
var serviceURL = '';

@Injectable({
  providedIn: 'root'
})
export class ChatGpt {
    
  private apiUrl = `${environment.pathName}`;
  //private apiUrl = 'https://salesguidance-happiestminds-dev.azurewebsites.net/api/Account'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

    public chatGpt(serviceEndpoint: any, data: any): Observable<any> {
    serviceURL = `${this.apiUrl}` + serviceEndpoint;
    return this.http.post(serviceURL, data);
  }

}