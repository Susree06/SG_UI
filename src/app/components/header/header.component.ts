import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'src/app/core/models/user-profile.model';
import { AzureAdDemoService } from 'src/app/core/services/azure-ad-demo.service';
import { MsalService } from '@azure/msal-angular';
import { MatMenuTrigger } from '@angular/material/menu';
import { AccessManagementService } from 'src/app/core/services/access-management.service';
import { ValidationPopupComponent } from '../my-dashboard/validation-popup/validation-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/core/services/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  roleName: any;
  opened = false;
  userProfile?: UserProfile;
  userProfilePic?: SafeResourceUrl;
  isAdmin: boolean = false;
  accountConfigurationPanel: boolean;
  accountConfiguration: boolean;
  revenueProjectionPanel: boolean;
  TMAccounts: boolean;
  FPAccounts: boolean;
  FMBAccounts: boolean;
  dashboardPanel: boolean;
  salesReports: boolean;
  workFlowDashboard: boolean;
  generateRevenue: boolean;
  accessManagementPanel: boolean;
  userRoleAssociation: boolean;
  userAccessManagement: boolean;
  userAccountAssociation: boolean;
  settingsPanel: boolean;
  fileUploadStatus: boolean;
  conversionRate: boolean;
  igConfiguration: boolean;
  geoLocation: boolean;
  projectReport:boolean;
  accountIGReport:boolean;
  accountHeadCountReport:boolean;
  routeArray: any[] = [];
  roleNamesString: any;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(
    public router: Router,
    private azureAdDemoService: AzureAdDemoService,
    private domSanitizer: DomSanitizer,
    private authService: MsalService,
    private _accessManagementService: AccessManagementService,
    private dialog: MatDialog,
    private _loginService: LoginService
  ) {}
  ngOnInit() {
    if (sessionStorage.getItem('isAdmin') !== null) {
      this.isAdmin =
        sessionStorage.getItem('isAdmin') == 'false' ? false : true;
    }
    this.getUserProfile();
    this.getUserProfilePic();

    this._accessManagementService.employeeRoleDetailsUpdated$.subscribe(() => {
      this.getUpdatedFeatureList();
    });
  }
  getFeatureList() {
    const featureName = JSON.parse(sessionStorage.getItem('featureNames'));
    if (featureName == undefined || featureName == null) {
      this.fetchFeatureList();
    } else {
      this.hidemenu(featureName);
    }
  }

  getUpdatedFeatureList() {
    this.fetchFeatureList();
  }
  private fetchFeatureList() {
    this._loginService.getUserDetails().subscribe({
      next: (data: any) => {
        sessionStorage.setItem(
          'featureNames',
          JSON.stringify(data.featureNames)
        );
        sessionStorage.setItem('roleNameList', data.rolenames);
        this.hidemenu(data.featureNames);
        this.roleNamesString = data.rolenames;
      },
      error: (error: any) => {
        this.openValidationPopup(error.errorMessage, error.title);
      },
    });
  }
  openMyMenu(menuTrigger: MatMenuTrigger) {
    menuTrigger.openMenu();
  }

  hidemenu(data: any) {
    this.accountConfiguration = false;
    this.TMAccounts = false;
    this.FPAccounts = false;
    this.FMBAccounts = false;
    this.salesReports = false;
    this.workFlowDashboard = false;
    this.generateRevenue = false;
    this.userRoleAssociation = false;
    this.userAccessManagement = false;
    this.userAccountAssociation = false;
    this.fileUploadStatus = false;
    this.conversionRate = false;
    this.igConfiguration = false;
    this.geoLocation = false;
    this.settingsPanel = false;
    this.accessManagementPanel = false;
    this.accountConfigurationPanel = false;
    this.revenueProjectionPanel = false;
    this.dashboardPanel = false;
    this.projectReport = false;
    this.accountHeadCountReport = false;
    this.accountIGReport = false;

    data.forEach((data: any) => {
      switch (data) {
        case 'Accounts Configuration':
          this.accountConfiguration = true;
          break;
        case 'T&M Accounts':
          this.TMAccounts = true;
          break;
        case 'FP Accounts':
          this.FPAccounts = true;
          break;
        case 'FMB Accounts':
          this.FMBAccounts = true;
          break;
        case 'Sales Report':
          this.salesReports = true;
          break;
        case 'Work Flow Dashboard':
          this.workFlowDashboard = true;
          break;
        case 'Generate Revenue':
          this.generateRevenue = true;
          break;
        case 'User Role Association':
          this.userRoleAssociation = true;
          break;
        case 'User Access Management':
          this.userAccessManagement = true;
          break;
        case 'User Account Association':
          this.userAccountAssociation = true;
          break;
        case 'File Upload Status':
          this.fileUploadStatus = true;
          break;
        case 'Conversion Rate':
          this.conversionRate = true;
          break;
        case 'IG Configuration':
          this.igConfiguration = true;
          break;
        case 'GeoLocation':
          this.geoLocation = true;
          break;
        case 'Project Report':
            this.projectReport = true;
          break;
        case 'IG Report':
            this.accountIGReport = true;
          break;
        case 'HeadCount Report':
            this.accountHeadCountReport = true;
          break;
      }
    });
    this.accountConfigurationPanel = this.accountConfiguration;
    this.revenueProjectionPanel =
      this.TMAccounts || this.FPAccounts || this.FMBAccounts;
    this.dashboardPanel =
      this.salesReports || this.workFlowDashboard || this.generateRevenue;
    this.accessManagementPanel =
      this.userRoleAssociation ||
      this.userAccessManagement ||
      this.userAccountAssociation;
    this.settingsPanel = this.fileUploadStatus || this.conversionRate ||  this.igConfiguration || this.geoLocation;

    if (this.accountConfiguration) {
      this.routeArray.push('/account-config');
    }
    if (this.TMAccounts) {
      this.routeArray.push('/manage-account');
    }
    if (this.FPAccounts) {
      this.routeArray.push('/fixed-price-account');
    }
    if (this.FMBAccounts) {
      this.routeArray.push('/fixed-monthly-account');
    }
    if (this.salesReports) {
      this.routeArray.push('/sales-report');
    }
    if (this.workFlowDashboard) {
      this.routeArray.push('/work-flow');
    }
    if (this.generateRevenue) {
      this.routeArray.push('/generate-revenue');
    }
    if (this.userRoleAssociation) {
      this.routeArray.push('/employee-role-association');
    }
    if (this.userAccessManagement) {
      this.routeArray.push('/role-access-management');
    }
    if (this.userAccountAssociation) {
      this.routeArray.push('/userConfig');
    }
    if (this.fileUploadStatus) {
      this.routeArray.push('/fileUpload');
    }
    if (this.conversionRate) {
      this.routeArray.push('/conversion-rate');
    }
    if (this.igConfiguration) {
      this.routeArray.push('/ig-configuration');
    }
    if (this.geoLocation) {
      this.routeArray.push('/geoLocation');
    }
    if (this.geoLocation) {
      this.routeArray.push('/project-report');
    }
    if (this.geoLocation) {
      this.routeArray.push('/headcount-report');
    }
    if (this.geoLocation) {
      this.routeArray.push('/ig-report');
    }
    this.routeArray.push('/');
    if (!this.routeArray.includes(this.router.url)) {
      this.router.navigate(['landing-page']);
      if (this.router.url !== '/landing-page') {
        this.dialog.open(ValidationPopupComponent, {
          width: '530px',
          data: {
            message: `Your current role restricts access to this page. Please try changing your role. If the issue persists, contact the system administrator for access.`,
            title: 'Access Denied !',
          },
        });
      }
    } else {
      // this._accessManagementService.triggerRoleChange(this.router.url);
    }

    this.routeArray = [];
    // this.uniqueRoles.clear();
  }

  getUserProfile() {
    this.azureAdDemoService.getUserProfile().subscribe((profileInfo) => {
      this.userProfile = profileInfo;
      var username = this.userProfile.displayName;
      sessionStorage.setItem('username', username);
      this.roleName = sessionStorage.getItem('roleName');
      this.roleNamesString = sessionStorage.getItem('roleNameList');
      this.getFeatureList();
      //  this.roleChange(this.roleName);
    });
  }
  getUserProfilePic() {
    this.azureAdDemoService.getUserProfilePic().subscribe((res) => {
      var urlCreator = window.URL || window.webkitURL;
      this.userProfilePic = this.domSanitizer.bypassSecurityTrustResourceUrl(
        urlCreator.createObjectURL(res)
      );
    });
    if (this.userProfilePic === undefined) {
      this.userProfilePic = '../../assets/image/Profile_Icon.jpg';
    }
  }
  goToLoginPage() {
    localStorage.clear();
    this.authService.logoutRedirect();
    //this.router.navigate(['/login']);
  }
  private openValidationPopup(error: any, title: any) {
    this.dialog.open(ValidationPopupComponent, {
      width: '530px',
      data: { message: error, title: title },
    });
  }
}
