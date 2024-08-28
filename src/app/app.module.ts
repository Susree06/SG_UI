import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions, MatTooltipModule} from '@angular/material/tooltip';
import { HeaderComponent } from './components/header/header.component';
import { AccountConfigComponent } from './components/account-wise-configuration/account-config/account-config.component';
import { WorkingHoursComponent } from './components/account-wise-configuration/working-hours/working-hours.component';
import { LeavesInPercentageComponent } from './components/account-wise-configuration/leaves-in-percentage/leaves-in-percentage.component';
import { HolidaysInDaysComponent } from './components/account-wise-configuration/holidays-in-days/holidays-in-days.component';
import { WorkingDaysComponent } from './components/account-wise-configuration/working-days/working-days.component';
import { BlendedRateComponent } from './components/account-wise-configuration/blended-rate/blended-rate.component';
import { BlendedRateEditComponent } from './components/account-wise-configuration/account-config-edits/blended-rate-edit/blended-rate-edit.component';
import { HolidaysInDaysEditComponent } from './components/account-wise-configuration/account-config-edits/holidays-in-days-edit/holidays-in-days-edit.component';
import { LeavesInPercentageEditComponent } from './components/account-wise-configuration/account-config-edits/leaves-in-percentage-edit/leaves-in-percentage-edit.component';
import { WorkingHoursEditComponent } from './components/account-wise-configuration/account-config-edits/working-hours-edit/working-hours-edit.component';
import { WorkingDaysEditComponent } from './components/account-wise-configuration/account-config-edits/working-days-edit/working-days-edit.component';
import { ManageAccountComponent } from './components/ramping/manage-account/manage-account.component';
import { PaginationComponent } from './components/ramping/pagination/pagination.component';
import { ManageAccountEditComponent } from './components/ramping/manage-account-edit/manage-account-edit.component';
import { ShowCommentsComponent } from './components/ramping/show-comments/show-comments.component';
import { SalesGuidanceComponent } from './components/sales-guidance/sales-guidance/sales-guidance.component';
import { MonthlyFilterComponent } from './components/sales-guidance/filters/monthly-filter/monthly-filter.component';
import { QuaterlyFilterComponent } from './components/sales-guidance/filters/quaterly-filter/quaterly-filter.component';
import { BiAnnuallyFilterComponent } from './components/sales-guidance/filters/bi-annually-filter/bi-annually-filter.component';
import { WorkFlowTableComponent } from './components/workflow-dashboard/work-flow-table/work-flow-table.component';
import { DashboardComponent } from './components/my-dashboard/dashboard/dashboard.component';
import { ReportFilesComponent } from './components/my-dashboard/report-files/report-files.component';
import { CreateNewAccountComponent } from './components/account-wise-configuration/create-new-account/create-new-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HolidayListComponent } from './components/account-wise-configuration/account-config-edits/holiday-list/holiday-list.component';
import { HolidayListTableComponent } from './components/account-wise-configuration/account-config-edits/holiday-list/holiday-list-table/holiday-list-table.component';
import { MonthlySalesTabComponent } from './components/sales-guidance/tabs/monthly-sales-tab/monthly-sales-tab.component';
import { QuaterlySalesTabComponent } from './components/sales-guidance/tabs/quaterly-sales-tab/quaterly-sales-tab.component';
import { ByAnnuallyTabComponent } from './components/sales-guidance/tabs/by-annually-tab/by-annually-tab.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ValidationPopupComponent } from './components/my-dashboard/validation-popup/validation-popup.component';
import { SuccessPopupComponent } from './components/my-dashboard/success-popup/success-popup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GenerateReportComponent } from './components/my-dashboard/report-files/generate-report/generate-report.component';
import { ReportListComponent } from './components/my-dashboard/report-list/report-list.component';
import { UserConfigurationComponent } from './components/user-configuration/user-configuration.component';
import { UserConfigDetailsComponent } from './components/user-configuration/user-config-details/user-config-details.component';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationInterceptor } from './core/services/authentication.interceptor';
import { FileUploadService } from './core/services/file-upload.service';
import { HolidaysService } from './core/services/holidays-service';
import { BlendedRatesService } from './core/services/blended-rates.service';
import { LeavesService } from './core/services/leaves.service';
import { WorkFlowDashboardService } from './core/services/work-flow-dashboard.service';
import { WorkingDaysService } from './core/services/working-days.service';
import { WorkingHoursService } from './core/services/working-hours.service';
import { AccountService } from './core/services/account.service';
import { NumbersOnlyDirective } from './common/directives/numbers-only.directive';
import { DecimalNumberDirective } from './common/directives/decimal-number.directive';
import { AlphanumericDirective } from './common/directives/alphanumeric-characters.directive';
import { AlphabetOnlyDirective } from './common/directives/alphabet-only.directive';
import { FailedPopupComponent } from './components/my-dashboard/failed-popup/failed-popup.component';
import { MaterialModuleModule } from './shared/material-module/material-module.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AlertPopupComponent } from './components/account-wise-configuration/blended-rate/alert-popup/alert-popup.component';
import { AccountNamePipe } from './common/pipes/account-name-pipe';
import { FileUploadStatusComponent } from './components/account-wise-configuration/file-upload-status/file-upload-status.component';
import { RampUpValidationPopupComponent } from './components/ramping/ramp-up-validation-popup/ramp-up-validation-popup.component';
import { SalesGuidanceLandingPageComponent } from './components/login/sales-guidance-landing-page/sales-guidance-landing-page.component';
import { ConversionRateComponent } from './components/my-dashboard/conversion-rate/conversion-rate.component';
import { ConversionRateService } from './core/services/conversionrate.service';
import { ConversionRatePopComponent } from './components/my-dashboard/conversion-rate-pop/conversion-rate-pop.component';
import { CountNumberFormatDirective } from './common/directives/count-number-format.directive';
import { SalesReportComponent } from './components/sales-report/sales-report.component';
import { YearsServices } from './core/services/years.services';
import { DyanamicRevenueComponent } from './components/dyanamic-revenue/dyanamic-revenue.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FixedPriceAccountComponent } from './components/ramping/fixed-price-account/fixed-price-account.component';
import { FixedMonthlyAccountComponent } from './components/ramping/fixed-monthly-account/fixed-monthly-account.component';
import { FixedMonthlyAccountEditComponent } from './components/ramping/fixed-monthly-account-edit/fixed-monthly-account-edit.component';
import { FixedPriceAccountEditComponent } from './components/ramping/fixed-price-account-edit/fixed-price-account-edit.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { CurrencyConverterBotComponent } from './components/currency-converter-bot/currency-converter-bot.component';
import { EmployeeRoleAssociationComponent } from './components/access-controls/employee-role-association/employee-role-association.component';
import { RoleAccessManagementComponent } from './components/access-controls/role-access-management/role-access-management.component';
import { EmployeeRoleAssociationPopupComponent } from './components/access-controls/employee-role-association-popup/employee-role-association-popup.component';
import { RoleAccessManagementPopupComponent } from './components/access-controls/role-access-management-popup/role-access-management-popup.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AccessManagementService } from './core/services/access-management.service';
import { ConfirmPopupComponent } from './components/my-dashboard/confirm-popup/confirm-popup.component';
 import { LoaderService } from './core/services/loader.service';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { GeoLocationConfigurationEditComponent } from './components/geoLocation-configuration/geoLocation-configuration-edit/geoLocation-configuration-edit.component';
import { GeoLocationConfigurationComponent } from './components/geoLocation-configuration/geoLocation-configuration.component';
import { OtherConfigComponent } from './components/account-wise-configuration/other-config/other-config.component';
import { OtherConfigEditComponent } from './components/account-wise-configuration/account-config-edits/other-config-edit/other-config-edit.component';
import { ToolTipComponent } from './components/tool-tip/tool-tip.component';
import { IgConfigurationComponent } from './components/ig-configuration/ig-configuration.component';
import { IgConfigurationDetailsComponent } from './components/ig-configuration/ig-configuration-details/ig-configuration-details.component';
import { ConversionRateHistoryPopUpComponent } from './components/my-dashboard/conversion-rate-history-pop-up/conversion-rate-history-pop-up.component';
import { DatePipe } from '@angular/common';
import { SalesAccountHeadcountRevenueReportComponent } from './components/sales-account-headcount-revenue-report/sales-account-headcount-revenue-report.component';
import { SalesAccountIGRevenueReportComponent } from './components/sales-account-ig-revenue-report/sales-account-ig-revenue-report.component';
import { SalesProjectRevenueReportComponent } from './components/sales-project-revenue-report/sales-project-revenue-report.component';
import { SalesReportFilterComponent } from './components/sales-report-filter/sales-report-filter.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MultiselectSearchComponent } from './common/dropdown/multiselect-search/multiselect-search.component';
import { ManageAccountOffshoreOnsiteComponent } from './components/ramping/manage-account-offshore-onsite/manage-account-offshore-onsite.component';

const isIE = window.navigator.userAgent.indexOf('MSIE') > -1
export const CustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 0,
  hideDelay: 0,
  touchendHideDelay: 1500,
  disableTooltipInteractivity:true ,
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AccountConfigComponent,
    WorkingHoursComponent,
    LeavesInPercentageComponent,
    HolidaysInDaysComponent,
    WorkingDaysComponent,
    BlendedRateComponent,
    BlendedRateEditComponent,
    HolidaysInDaysEditComponent,
    LeavesInPercentageEditComponent,
    WorkingHoursEditComponent,
    WorkingDaysEditComponent,
    ManageAccountComponent,
    PaginationComponent,
    ManageAccountEditComponent,
    ShowCommentsComponent,
    SalesGuidanceComponent,
    MonthlyFilterComponent,
    QuaterlyFilterComponent,
    BiAnnuallyFilterComponent,
    WorkFlowTableComponent,
    DashboardComponent,
    GenerateReportComponent,
    ReportFilesComponent,
    ReportListComponent,
    CreateNewAccountComponent,
    HolidayListComponent,
    HolidayListTableComponent,
    MonthlySalesTabComponent,
    QuaterlySalesTabComponent,
    ByAnnuallyTabComponent,
    ValidationPopupComponent,
    SuccessPopupComponent,
    UserConfigurationComponent,
    UserConfigDetailsComponent,
    NumbersOnlyDirective,
    DecimalNumberDirective,
    AlphanumericDirective,
    AlphabetOnlyDirective,
    LoginComponent,
    FailedPopupComponent,
    AlertPopupComponent,
    FileUploadStatusComponent,
    RampUpValidationPopupComponent,
    SalesGuidanceLandingPageComponent,
    ConversionRateComponent,
    ConversionRatePopComponent,
    CountNumberFormatDirective,
    SalesReportComponent,
    DyanamicRevenueComponent,
    FixedPriceAccountComponent,
    FixedMonthlyAccountComponent,
    FixedMonthlyAccountEditComponent,
    FixedPriceAccountEditComponent,
    CurrencyConverterComponent,
    CurrencyConverterBotComponent,
    EmployeeRoleAssociationComponent,
    RoleAccessManagementComponent,
    EmployeeRoleAssociationPopupComponent,
    RoleAccessManagementPopupComponent,
    LoaderComponent,
    ConfirmPopupComponent,
    SearchInputComponent,
    OtherConfigComponent,
    OtherConfigEditComponent,
    ToolTipComponent,
    IgConfigurationComponent,
    IgConfigurationDetailsComponent,
    GeoLocationConfigurationComponent,
    GeoLocationConfigurationEditComponent,
    ConversionRateHistoryPopUpComponent,
    SalesAccountHeadcountRevenueReportComponent,
    SalesAccountIGRevenueReportComponent,
    SalesProjectRevenueReportComponent,
    SalesReportFilterComponent,
    MultiselectSearchComponent,
    ManageAccountOffshoreOnsiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatTooltipModule,
    AccountNamePipe,
    HighchartsChartModule,
    ScrollingModule,
    MsalModule.forRoot(new PublicClientApplication
      (
        {
          auth: {
            clientId: "5b0f07d5-efb2-434d-99b4-22c1e40124c2",
            authority: "https://login.microsoftonline.com/77428205-87ff-4048-a645-91b337240228",
            //redirectUri: "https://hmsalesguidanceuat.z30.web.core.windows.net/",
            //redirectUri: "https://salesguidancedev.z30.web.core.windows.net/",
            redirectUri: "http://localhost:4200/"
          },
          cache: {
            cacheLocation: 'localStorage',
            storeAuthStateInCookie: true,
          }
        }
      ),
      {
        interactionType: InteractionType.Redirect,
        authRequest:
        {
          scopes: ['user.read']
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map(
          [
            ['https://graph.microsoft.com/v1.0/me', ['user.read']],
            //['happiestminds-salesguidance-uat.azurewebsites.net', ['api://5b0f07d5-efb2-434d-99b4-22c1e40124c2/scope.read']]
            ['localhost', ['api://5b0f07d5-efb2-434d-99b4-22c1e40124c2/scope.read']]
           //['salesguidance-happiestminds-dev.azurewebsites.net', ['api://5b0f07d5-efb2-434d-99b4-22c1e40124c2/scope.read']]
          ]
        )
      }
    )
  ],
  providers: [FileUploadService, HolidaysService, BlendedRatesService, LeavesService, WorkFlowDashboardService, WorkingDaysService, WorkingHoursService, AccountService,ConversionRateService, YearsServices,AccessManagementService,LoaderService,DatePipe,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: CustomTooltipDefaults },
    {
      provide: HTTP_INTERCEPTORS, multi: true,
      useClass: MsalInterceptor,
    }, MsalGuard,
    {
      provide: HTTP_INTERCEPTORS, multi: true,
      useClass: AuthenticationInterceptor,
    },
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
