import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchResultPagingDto } from '../models/pagination.model';

@Injectable({
    providedIn: 'root'
  })

export class RampUpDownService {
 
    private apiUrl = `${environment.pathName}`;

    constructor(private http: HttpClient) {}
  
   public getAccountWiseHeadCount()  {
    const url = `${environment.pathName}RampUpDown/GetLatestHeadCount`;
    return this.http.get(url);
   }

public getFixedMonthlyAccountDetails(type:string){
  const url = `${environment.pathName}FPandFMB?type=${type}`;
  return this.http.get(url);
}

   public getAccountWiseHeadCountbyId(accountId: any, projectId: any, location: any) {
    const url = `${environment.pathName}RampUpDown/GetHeadCountByAccountId?accountId=${accountId}&projectId=${projectId}&location=${location}`;
    return this.http.get(url);
   }
   public getBillingDetailByAccountId(accountId: any, projectId: any, location: any) {
    const url = `${environment.pathName}FPandFMB/GetBillingDetailByAccountId?accountId=${accountId}&projectId=${projectId}&location=${location}`;
    return this.http.get(url);
   }
   public UpsertFMandFMBHeadCount(FM_FMB_details : any) {
    const url = `${environment.pathName}FPandFMB/UpsertHeadCount`;
    return this.http.post(url, FM_FMB_details);
   }


   public UpsertHeadCount(rampdetails : any) {
    const url = `${environment.pathName}RampUpDown/UpsertHeadCount`;
    return this.http.post(url, rampdetails);
   }
}

