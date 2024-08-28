import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AccountConfigComponent } from './components/account-wise-configuration/account-config/account-config.component';
import { ManageAccountComponent } from './components/ramping/manage-account/manage-account.component';
import { PaginationComponent } from './components/ramping/pagination/pagination.component';
import { SalesGuidanceComponent } from './components/sales-guidance/sales-guidance/sales-guidance.component';
import { DashboardComponent } from './components/my-dashboard/dashboard/dashboard.component';
import { ReportFilesComponent } from './components/my-dashboard/report-files/report-files.component';
import { HeaderComponent } from './components/header/header.component';
import { MsalGuard } from '@azure/msal-angular';
import { WorkFlowTableComponent } from './components/workflow-dashboard/work-flow-table/work-flow-table.component';
import { UserConfigurationComponent } from './components/user-configuration/user-configuration.component';
import { FileUploadStatusComponent } from './components/account-wise-configuration/file-upload-status/file-upload-status.component';
import { SalesGuidanceLandingPageComponent } from './components/login/sales-guidance-landing-page/sales-guidance-landing-page.component';
import { ConversionRateComponent } from './components/my-dashboard/conversion-rate/conversion-rate.component';
import { SalesReportComponent } from './components/sales-report/sales-report.component';
import { DyanamicRevenueComponent } from './components/dyanamic-revenue/dyanamic-revenue.component';
import { FixedPriceAccountComponent } from './components/ramping/fixed-price-account/fixed-price-account.component';
import { FixedMonthlyAccountComponent } from './components/ramping/fixed-monthly-account/fixed-monthly-account.component';
import { EmployeeRoleAssociationComponent } from './components/access-controls/employee-role-association/employee-role-association.component';
import { RoleAccessManagementComponent } from './components/access-controls/role-access-management/role-access-management.component';
import { AuthGuard } from './core/guards/auth.guard';
import { IgConfigurationComponent } from './components/ig-configuration/ig-configuration.component';
import { GeoLocationConfigurationComponent } from './components/geoLocation-configuration/geoLocation-configuration.component';
import { SalesAccountHeadcountRevenueReportComponent } from './components/sales-account-headcount-revenue-report/sales-account-headcount-revenue-report.component';
import { SalesAccountIGRevenueReportComponent } from './components/sales-account-ig-revenue-report/sales-account-ig-revenue-report.component';
import { SalesProjectRevenueReportComponent } from './components/sales-project-revenue-report/sales-project-revenue-report.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'sales-report',component:SalesReportComponent, canActivate: [MsalGuard,AuthGuard]},
  {path:'landing-page',component: SalesGuidanceLandingPageComponent, canActivate: [MsalGuard,AuthGuard]},
  {path:'account-config',component: AccountConfigComponent, canActivate: [MsalGuard,AuthGuard]},
  {path:'manage-account', component:PaginationComponent, canActivate: [MsalGuard,AuthGuard]},
  {path:'fixed-price-account', component:FixedPriceAccountComponent, canActivate: [MsalGuard,AuthGuard]},
  {path:'fixed-monthly-account', component:FixedMonthlyAccountComponent, canActivate: [MsalGuard,AuthGuard]},
  // {path:'sales-guidance', component: SalesGuidanceComponent , canActivate: [MsalGuard]},
  //{path:'work-flow', component: WorkflowComponent, canActivate: [MsalGuard]},
  {path: 'header', component: HeaderComponent, canActivate: [MsalGuard]},
  //{path:'',component:LoginComponent},
  { path: 'work-flow', component: WorkFlowTableComponent, canActivate: [MsalGuard,AuthGuard] },
  // {path:'dashboard',component:DashboardComponent},
  //{path:'reportFiles',component:ReportFilesComponent},
  {path:'userConfig',component:UserConfigurationComponent, canActivate: [MsalGuard,AuthGuard]},
  {path:'fileUpload',component:FileUploadStatusComponent, canActivate: [MsalGuard,AuthGuard]},
  {path:'conversion-rate',component:ConversionRateComponent, canActivate: [MsalGuard,AuthGuard]},
  {path:'generate-revenue',component:DyanamicRevenueComponent, canActivate: [MsalGuard,AuthGuard]},
  {path:'employee-role-association',component:EmployeeRoleAssociationComponent, canActivate: [MsalGuard,AuthGuard]},
  {path:'role-access-management',component:RoleAccessManagementComponent, canActivate: [MsalGuard,AuthGuard]},
  {path:'ig-configuration', component:IgConfigurationComponent, canActivate:[MsalGuard,AuthGuard]},
  {path:'geoLocation', component:GeoLocationConfigurationComponent, canActivate:[MsalGuard,AuthGuard]},
  {path:'project-report',component:SalesProjectRevenueReportComponent},
  {path:'headcount-report',component:SalesAccountHeadcountRevenueReportComponent},
  {path:'ig-report',component:SalesAccountIGRevenueReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
