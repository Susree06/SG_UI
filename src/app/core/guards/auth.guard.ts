import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn,
} from '@angular/router';
import { catchError, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AccessManagementService } from '../services/access-management.service';
import { MatDialog } from '@angular/material/dialog';
import { ValidationPopupComponent } from 'src/app/components/my-dashboard/validation-popup/validation-popup.component';
import { LoginService } from '../services/login.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const accessManagementService = inject(AccessManagementService);
  const router = inject(Router);
  const dialog = inject(MatDialog);
  const loginService = inject(LoginService);

  const roleName = sessionStorage.getItem('roleName');
  const featureName = sessionStorage.getItem('featureNames');
  if (roleName) {
    return checkAccess(
      roleName,
      route,
      router,
      dialog,
      accessManagementService
    );
  } else {
    return loginService.getUserDetails().pipe(
      tap((userDetails) => {
        if (userDetails) {
          sessionStorage.setItem(
            'featureNames',
            JSON.stringify(userDetails.featureNames)
          );
          sessionStorage.setItem(
            'isAdmin',
            userDetails.rolenames.includes('Admin') ||
              userDetails.rolenames.includes('Executives')
          );
          sessionStorage.setItem(
            'isBDM',
            userDetails.rolenames.includes('BDM')
          );
          if (userDetails.rolenames.length > 0) {
            sessionStorage.setItem('roleName', userDetails.rolenames[0]);
            sessionStorage.setItem('roleNameList', userDetails.rolenames);
          }
        } else {
          sessionStorage.setItem('isAdmin', 'false');
          sessionStorage.setItem('isBDM', 'false');
          sessionStorage.setItem('roleName', null);
          sessionStorage.setItem('featureNames', null);
        }
      }),
      switchMap(() => {
        const newRoleName = sessionStorage.getItem('roleName');
        return checkAccess(
          newRoleName,
          route,
          router,
          dialog,
          accessManagementService
        );
      }),
      catchError((error) => {
        console.error(
          'Error occurred in loginService.getUserDetails():',
          error
        );
        showAccessDenied(router, dialog);
        return of(false);
      })
    );
  }
};

function checkAccess(
  roleName: string,
  route: ActivatedRouteSnapshot,
  router: Router,
  dialog: MatDialog,
  accessManagementService: AccessManagementService
) {
  const url = route.routeConfig?.path;
  let path: string;

  if (!roleName || !url) {
    showAccessDenied(router, dialog);
    return of(false);
  }

  if (url === 'landing-page') {
    return of(true);
  }
  let featureName = JSON.parse(sessionStorage.getItem('featureNames'));
  if (!featureName) {
    showAccessDenied(router, dialog);
    return of(false);
  }

  switch (url) {
    case 'account-config':
      path = 'Accounts Configuration';
      break;
    case 'manage-account':
      path = 'T&M Accounts';
      break;
    case 'fixed-price-account':
      path = 'FP Accounts';
      break;
    case 'fixed-monthly-account':
      path = 'FMB Accounts';
      break;
    case 'sales-report':
      path = 'Sales Report';
      break;
    case 'work-flow':
      path = 'Work Flow Dashboard';
      break;
    case 'generate-revenue':
      path = 'Generate Revenue';
      break;
    case 'employee-role-association':
      path = 'User Role Association';
      break;
    case 'role-access-management':
      path = 'User Access Management';
      break;
    case 'userConfig':
      path = 'User Account Association';
      break;
    case 'fileUpload':
      path = 'File Upload Status';
      break;
    case 'conversion-rate':
      path = 'Conversion Rate';
      break;
    case 'ig-configuration':
      path = 'IG Configuration';
      break;
    case 'geoLocation':
      path = 'GeoLocation';
      break;  
    case 'project-report':
      path = 'Project Report';
      break;  
    case 'ig-report':
      path = 'IG Report';
      break; 
    case 'headcount-report':
        path = 'HeadCount Report';
      break;  
  }
  const hasAccess = featureName.includes(path);
  if (hasAccess) {
    return of(true);
  } else {
  //  showAccessDenied(router, dialog);
    return of(false);
  }
}

function showAccessDenied(router: Router, dialog: MatDialog) {
  router.navigate(['/login']);
  dialog.open(ValidationPopupComponent, {
    width: '530px',
    data: {
      message:
        'You do not have the necessary permissions to access this application. Contact the system admin if you need further assistance.',
      title: 'Access Denied !',
    },
  });
}