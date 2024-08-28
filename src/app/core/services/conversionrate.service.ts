import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

  export class ConversionRateService {
    private apiUrl = `${environment.pathName}`;
  
    constructor(private http: HttpClient) {}

    public getConversionRate() : Observable<any> {
        const url = `${this.apiUrl}Conversion/GetConversionRates`;
        return this.http.get<any>(url);
    }

    public ConversionRateUpdate(data:any) {
      const url = `${this.apiUrl}Conversion/ConversionRates`;
      return this.http.post(url,data);
    }
  }
