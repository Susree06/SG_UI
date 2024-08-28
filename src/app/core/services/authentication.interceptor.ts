import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,of,throwError} from 'rxjs';
import { retry, catchError, timeout, map, finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  private totalRequests = 0;
  private userRole :string;
  constructor(private loaderService:LoaderService,private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.userRole = sessionStorage.getItem('roleName')
    this.totalRequests++;
    if(this.router.url != "/generate-revenue"){
    this.loaderService.showLoader();
    }
    request=request.clone({
      setHeaders:{Role : this.userRole}
    })
    return next.handle(request)
     .pipe(
       retry(1),
       finalize(()=>{
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loaderService.hideLoader();
        }
       }),
       catchError((error: HttpErrorResponse)  => {
        return this.handleErrors(error)
       })
     )
  }
  handleErrors(error: HttpErrorResponse): Observable<any>  {
    var errorMessage = '';
    var title:string;
    switch (error.status) {
      case 500:
        title = "Internal Server Error!";
        errorMessage = error.error.Message;
        break;
      case 404:
        title = "Not Found !";
        errorMessage = error.error.Message;
        break;
      case 0:
        title = "Unexpected Server Error !";
        errorMessage = "Error while loading the data";
        break;
      case 400:
        title = "Bad Request !";
        errorMessage = error.error.Message;
        break;  
      default:
        title = "Internal Server Error!";
        errorMessage = error.error.Message;
    }
     return throwError(()=>{return {errorMessage,title}});
  }
}
