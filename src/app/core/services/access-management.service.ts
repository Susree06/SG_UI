import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
var serviceURL = '';

@Injectable({
  providedIn: 'root'
})
export class AccessManagementService {

  private apiUrl = `${environment.pathName}`;
  private employeeRoleDetailsUpdatedSource = new Subject<void>();
  employeeRoleDetailsUpdated$ = this.employeeRoleDetailsUpdatedSource.asObservable();
  constructor(private http : HttpClient) { }
  updateEmployeeRoleDetails() {
    this.employeeRoleDetailsUpdatedSource.next();
  }

  getEmployeeRoleDetails(serviceEndpoint: any): Observable<any> {
    serviceURL = this.apiUrl + serviceEndpoint;
    return this.http.get<any[]>(serviceURL);
  }

  UpdateDetails(serviceEndpoint: any, data: any): Observable<any> {
    serviceURL = this.apiUrl + serviceEndpoint;
    return this.http.put(serviceURL, data);
  }

  AddNewUser(serviceEndpoint: any, data: any): Observable<any> {
    serviceURL = this.apiUrl + serviceEndpoint;
    return this.http.post(serviceURL, data);
  }

  getRoleList(serviceEndpoint: any): Observable<any> {
    serviceURL = this.apiUrl + serviceEndpoint;
    return this.http.get<any[]>(serviceURL);
  }

  addNewRole(serviceEndpoint: any, data: any): Observable<any> {
    serviceURL = this.apiUrl + serviceEndpoint;
    return this.http.post(serviceURL, data);
  }

  GetFeatureDetailsByRole(serviceEndpoint: any, data: any): Observable<any> {
    serviceURL = this.apiUrl + serviceEndpoint + "/" + data;
    return this.http.get(serviceURL, data);
  }
  hasPermission(serviceEndpoint: any): Observable<any> {
    serviceURL = this.apiUrl + serviceEndpoint ;
    return this.http.get(serviceURL);
  }
}
